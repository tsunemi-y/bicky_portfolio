<?php

namespace App\Strategies\Reservation\Insert;

use App\Consts\ConstReservation;
use App\Strategies\Reservation\Insert\Interfaces\InsertStrategyInterface;
use App\Repositories\Interfaces\AvailableReservationDatetimeRepositoryInterface;

class DayInsertStrategy implements InsertStrategyInterface
{
    private  $date;
    private  $availableReservationDatetimeRepository;

    public function __construct($date, AvailableReservationDatetimeRepositoryInterface $availableReservationDatetimeRepository)
    {
        $this->date = $date;
        $this->availableReservationDatetimeRepository = $availableReservationDatetimeRepository;
    }

    public function insert()
    {
        $insertDatetimes = [];
        foreach (ConstReservation::AVAILABLE_TIME_LIST as $time) {
            $insertDatetimes[] = [
                'available_date' => $this->date,
                'available_time' => $time,
            ];
        }

        $this->availableReservationDatetimeRepository->bulkInsert($insertDatetimes);
    }
}