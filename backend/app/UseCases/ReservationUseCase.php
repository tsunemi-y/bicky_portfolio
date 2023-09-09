<?php

namespace App\UseCases;


use Exception;
use App\Services\AuthService;
use App\Services\MailService;
use App\Services\UserService;
use Illuminate\Support\Facades\DB;
use App\Services\ReservationService;
use App\Services\GoogleCalendarService;
use App\Services\LineMessengerServices;

class ReservationUseCase
{
    public function __construct(
        private ReservationService $reservationService,
        private UserService $userService,
        private AuthService $authService,
        private LineMessengerServices $lineMessengerServices,
        private MailService $mailService,
        private GoogleCalendarService $googleCalendarService
    ) 
    {    
    }

    public function create($request)
    {
        try {
            DB::beginTransaction();

            // 指定した日時がすでに埋まっている場合、予約トップにリダイレクト
            $isReserved = $this->reservationService->existsDuplicateReservation($request);
            if ($isReserved) {
                return ['isReservationDuplicate' => true];
            }

            $token = $request->cookie('jwt');

            $userId = $this->authService->getAuthUserId($token);

            $userInfo = $this->userService->getUserById($userId);

            $endTime = $this->reservationService->calculateReservationEndTime($request, $userInfo->use_time);

            $reservedInfo = $this->reservationService->createReservation($request->date, $request->time, $userId, $endTime);

            $messageData = [
                'childName' => $userInfo->childName,
                'childName2' => $userInfo->childName2,
                'reservationDate' => formatDate($request->date),
                'reservationTime' => formatTime($request->time),
                'email' => $userInfo->email,
                'reservationId' => $reservedInfo->id,
            ];

            // 管理者へ予約通知のLINEメッセージ送信
            $this->lineMessengerServices->sendReservationMessage($messageData['childName'], $messageData['childName2'], $messageData['reservationDate'], $messageData['reservationTime']);

            $viewFile = 'emails.reservations.user';
            $subject = '予約を受け付けました';
            $this->mailService->sendMailToUser($messageData, $viewFile, $subject);

            $this->googleCalendarService->createEvent($userInfo->parentName, $request->date. $request->time, $request->date. $endTime, $reservedInfo->id);

            DB::commit();

            return ['isReservationSuccess' => true];
        } catch (Exception $e) {
            DB::rollback();
            return ['error' => $e->getMessage()];
        }
    }

    public function delete($reservation)
    {
        $this->reservationService->deleteReservation($reservation);

        $messageData = [
            'reservationDate' => formatDate($reservation->reservation_date),
            'reservationTime' => formatTime($reservation->reservation_time),
            'childName'       => $reservation->user->childName,
            'childName2'      => $reservation->user->childName2,
            'email'           => $reservation->user->email,
        ];

        // 管理者へ予約キャンセルのLINEメッセージ送信
        $this->lineMessengerServices->sendCancelReservationMessage($messageData['childName'], $messageData['childName2'], $messageData['reservationDate'], $messageData['reservationTime']);

        $viewFile = 'emails.reservations.cancel';
        $subject = '予約をキャンセルしました';
        $this->mailService->sendMailToUser($messageData, $viewFile, $subject);

        $this->googleCalendarService->delete($reservation->id);

        return [
            'isCancelSuccess' => true
        ];
    }
}
