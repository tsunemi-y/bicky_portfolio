<?php

namespace App\Repositories;

use App\Models\GoogleCaleandar;
use App\Repositories\Interfaces\GoogleCalendarRepositoryInterface;

class GoogleCalendarRepository implements GoogleCalendarRepositoryInterface

{
    private $googleCalendar;

    public function __construct()
    {
        $this->googleCalendar = new GoogleCaleandar();
    }

    public function findByReservationId($reservationId)
    {
        return $this->googleCalendar->where('reservation_id', $reservationId)->first();
    }

    public function store($eventId, $reservationId)
    {
        $this->googleCalendar->create([
            'reservation_id' => $reservationId,
            'event_id' => $eventId,
        ]);
    }

    public function delete($googleCalendar)
    {
        return $googleCalendar->delete();
    }

}
