<?php

namespace App\Strategies\Reservation\Insert;

use App\Strategies\Reservation\Insert\Interfaces\InsertStrategyInterface;
use App\Repositories\Interfaces\AvailableReservationDatetimeRepositoryInterface;

class SingleInsertStrategy implements InsertStrategyInterface
{
    private  $date;
    private  $time;
    private  $availableReservationDatetimeRepository;

    public function __construct($date, $time, AvailableReservationDatetimeRepositoryInterface $availableReservationDatetimeRepository)
    {
        $this->date = $date;
        $this->time = $time;
        $this->availableReservationDatetimeRepository = $availableReservationDatetimeRepository;
    }

    public function insert()
    {
        $this->availableReservationDatetimeRepository->create($this->date, $this->time);
    }
}
