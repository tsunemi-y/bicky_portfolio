<?php

namespace App\Services;

use Google_Service_Calendar_Event;
use App\Infrastructures\GoogleCalendarApiClient;
use App\Repositories\Interfaces\GoogleCalendarRepositoryInterface;

class GoogleCalendarService
{
    public function __construct(
        private GoogleCalendarApiClient $client,
        private GoogleCalendarRepositoryInterface $repository
    )
    {
    }

    public function createEvent($parentName, $startDateTime, $endDateTime, $reservationId)
    {
        try {
            $event = new Google_Service_Calendar_Event([
                //タイトル
                'summary' => $parentName,
                'start' => array(
                    // 開始日時
                    'dateTime' => str_replace(' ', 'T', date('Y-m-d H:i:sP', strtotime($startDateTime))),
                    'timeZone' => 'Asia/Tokyo',
                ),
                'end' => array(
                    // 終了日時
                    'dateTime' => str_replace(' ', 'T', date('Y-m-d H:i:sP', strtotime($endDateTime))),
                    'timeZone' => 'Asia/Tokyo',
                ),
            ]);

            $event = $this->client->insertEvent($event);


            $this->storeEventId($event, $reservationId);
        } catch (\Exception $e) {
            \Log::info($e);
        }
    }

    public function storeEventId($event, $reservationId)
    {
        $seachStr = '=';
        $eventId = mb_substr($event->htmlLink, mb_strrpos($event->htmlLink, $seachStr) + 1, mb_strlen($event->htmlLink));
        
        $this->repository->store($eventId, $reservationId);
    }

    public function delete($reservationId)
    {
        try {
            $googleCalendar = $this->repository->findByReservationId($reservationId);

            $this->client->deleteEvent($googleCalendar->eventId);

            $this->repository->delete($googleCalendar);
        } catch (\Exception $e) {
            \Log::info($e);
        }
    }
}
