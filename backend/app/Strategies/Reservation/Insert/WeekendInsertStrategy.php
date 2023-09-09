<?php

namespace App\Strategies\Reservation\Insert;

use App\Strategies\Reservation\Insert\AbstractInsertStrategy;
use App\Strategies\Reservation\Insert\Interfaces\InsertStrategyInterface;
use App\Repositories\Interfaces\AvailableReservationDatetimeRepositoryInterface;

class WeekendInsertStrategy extends AbstractInsertStrategy implements InsertStrategyInterface
{
    private  $monthCount;
    private  $nonDayDate;
    private  $availableReservationDatetimeRepository;
    private  $targetInsertWeeks;

    public function __construct($monthCount, $nonDayDate, AvailableReservationDatetimeRepositoryInterface $availableReservationDatetimeRepository)
    {
        $this->monthCount = $monthCount;
        $this->nonDayDate = $nonDayDate;
        $this->availableReservationDatetimeRepository = $availableReservationDatetimeRepository;
        $this->targetInsertWeeks = [0, 6];
    }

    public function insert()
    {
        $insertDatetimes = $this->createInsertDatetimes($this->monthCount, $this->nonDayDate, $this->targetInsertWeeks);
        $this->availableReservationDatetimeRepository->bulkInsert($insertDatetimes);
    }
}