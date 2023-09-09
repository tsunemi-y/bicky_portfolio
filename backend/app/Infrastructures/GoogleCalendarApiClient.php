<?php

namespace App\Infrastructures;

use Google_Client;
use Google_Service_Calendar;

class GoogleCalendarApiClient
{
    private $client;
    private $service;
    private $calendarId;

    public function __construct()
    {
        $this->client = $this->getClient();
        $this->service = new Google_Service_Calendar($this->client);
        $this->calendarId = config('services.google_calendar.id');
    }

    public function insertEvent($event)
    {
        return $this->service->events->insert($this->calendarId, $event);
    }

    public function deleteEvent($eventId)
    {
        $this->service->events->delete($this->calendarId, $eventId);
    }

    private function getClient()
    {
        $client = new Google_Client();

        $client->setApplicationName('ビッキー_予約者一覧');
        $client->setScopes(Google_Service_Calendar::CALENDAR_EVENTS);
        $client->setAuthConfig(storage_path('app/api-key/bicky-347713-47d82b536dcd.json'));

        return $client;
    }
}
