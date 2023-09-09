<?php

namespace App\Repositories\Interfaces;

interface GoogleCalendarRepositoryInterface
{
    public function findByReservationId($reservationId);

    public function store($eventId, $reservationId);

    public function delete($googleCalendar);
}
