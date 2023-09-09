<?php

namespace App\Repositories\Interfaces;

interface ReservationRepositoryInterface
{
    public function getAvailableDatetimes();

    public function getReservations();

    public function delete($reservation);

    public function create($userId, $avaDate, $avaTime, $endTime);

    public function findReservationByDateAndTime($date, $time);

    public function getTodaysReservations($today);
    
    public function getCurrentMonthReservationSummary();
}
