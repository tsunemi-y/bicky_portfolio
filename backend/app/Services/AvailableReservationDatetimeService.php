<?php

namespace App\Services;

use App\Repositories\Interfaces\AvailableReservationDatetimeRepositoryInterface;

class AvailableReservationDatetimeService
{
    public function __construct (
        private AvailableReservationDatetimeRepositoryInterface $availableReservationDatetimeRepository,
    )
    {
    }

    public function getIdByDateAndTime($date, $time)
    {
        return $this->availableReservationDatetimeRepository->getIdByDateAndTime($date, $time);
    }

    public function delete($availableReservationDatetime) 
    {
        $this->availableReservationDatetimeRepository->delete($availableReservationDatetime);
    }
}
