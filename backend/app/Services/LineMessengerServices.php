<?php

namespace App\Services;

use App\Infrastructures\LineApiClient;
use App\Repositories\Interfaces\ReservationRepositoryInterface;

class LineMessengerServices
{
    private $userId;
    private $lineApiClient;

    public function __construct(private ReservationRepositoryInterface $reservationRepository)
    {
        $this->userId = config('services.line.admin_id');
        $this->lineApiClient = new LineApiClient();
    }

    public function sendMessage($message)
    {
        $this->lineApiClient->sendMessage($this->userId, $message);
    }

    // 予約者一覧メッセージを送信
    public function sendReservationListMessage()
    {
        $today = date("Y-m-d H:i:s");
        $todayReservationList = $this->reservationRepository->getTodaysReservations($today);
        if (count($todayReservationList) == 0) {
            $message = '本日の予約者はいません。';
        } else {
            // 本日の予約者がいる場合、名前と時間をスタッフに送信
            $todayReservationListCount = count($todayReservationList);
            $message = '本日の予約者は下記の通りです。' . "\n" . "\n";
            foreach ($todayReservationList as $key => $rsv) {
                $message .= $rsv->user->parentName . ': ' . $rsv->reservation_time;

                if ($todayReservationListCount != $key + 1) {
                    $message .= "\n";
                }
            }
        }

        $this->sendMessage($message);
    }

    // 予約時にメッセージ送信
    public function sendReservationMessage($name, $name2, $reservationDate, $reservationTime)
    {
        $message = 'ご予約を受け付けました。' . "\n" . "\n";
        $message .= "利用児氏名：　{$name}" . "\n";
        if (!empty($name2)) $message .= "利用児2氏名：　{$name2}" . "\n";
        $message .= "予約日時：　{$reservationDate}" . "\n";
        $message .= "予約時間：　{$reservationTime}";

        $this->sendMessage($message);
    }

    // 予約キャンセルがあった場合にメッセージ送信
    public function sendCancelReservationMessage($name, $name2, $reservationDate, $reservationTime)
    {
        $message = 'ご予約がキャンセルされました。' . "\n" . "\n";
        $message .= "利用児氏名：　{$name}" . "\n";
        if (!empty($name2)) $message .= "利用児2氏名：　{$name2}" . "\n";
        $message .= "予約日時：　{$reservationDate}" . "\n";
        $message .= "予約時間：　{$reservationTime}";

        $this->sendMessage($message);
    }

    // 新規登録者のメッセージ作成
    public function sendRegistrationMessage($user)
    {
        $coursePlan = convertCourseFeeToName($user->fee);

        $message = '新規登録を受付ました。' . "\n" . "\n";
        $message .= "保護者氏名：　$user->parentName" . "\n";
        $message .= "メールアドレス：　$user->email" . "\n";
        $message .= "電話番号：　$user->tel" . "\n";
        $message .= "利用児氏名：　$user->childName" . "\n";
        $message .= "年齢：　$user->age" . "\n";
        $message .= "性別：　$user->gender" . "\n";
        if (!empty($user->diagnosis)) $message .= "診断名：　$user->diagnosis" . "\n";
        if (!empty($user->childName2)) $message .= "利用児氏名2：　$user->childName2" . "\n";
        if (!empty($user->age2)) $message .= "年齢2：　$user->age2" . "\n";
        if (!empty($user->gender2)) $message .= "性別2：　$user->gender2" . "\n";
        if (!empty($user->diagnosis2)) $message .= "診断名2：　$user->diagnosis2" . "\n";
        $message .= "住所：　$user->address" . "\n";
        if (!empty($user->introduction)) $message .= "紹介先：　$user->introduction" . "\n";
        if (!empty($user->consaltation)) $message .= "相談内容：　$user->consaltation" . "\n";
        $message .= "ご利用プラン：　{$coursePlan}" . "\n";
        $message .= "料金：　$user->fee";
        
        $this->sendMessage($message);
    }

    // 予約情報送信
    public function sendReservationReport()
    {
        $result = $this->reservationRepository->getCurrentMonthReservationSummary();

        $message = '総予約数：　'. $result->total_reservation. '件'. "\n";
        $message .= '総売上：　'. number_format($result->total_amount). '円';

        $this->sendMessage($message);
    }
}
