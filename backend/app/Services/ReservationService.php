<?php

namespace App\Services;

use \Yasumi\Yasumi;
use App\Strategies\Reservation\Insert\InsertStrategy;
use App\Strategies\Reservation\Insert\DayInsertStrategy;
use App\Strategies\Reservation\Insert\MonthInsertStrategy;
use App\Strategies\Reservation\Insert\SingleInsertStrategy;
use App\Strategies\Reservation\Insert\WeekendInsertStrategy;
use App\Repositories\Interfaces\ReservationRepositoryInterface;
use App\Repositories\Interfaces\AvailableReservationDatetimeRepositoryInterface;

class ReservationService
{
    public function __construct(
        private GoogleCalendarService $googleCalendarService, 
        private AvailableReservationDatetimeService $availableReservationDatetimeService,
        private ReservationRepositoryInterface $reservationRepository,
        private AvailableReservationDatetimeRepositoryInterface $availableReservationDatetimeRepository
    ) {
    }

    public function getAvailableDatetimes()
    {
        return $this->reservationRepository->getAvailableDatetimes();
    }

    public function createReservation($avaDate, $avaTime, $userId, $endTime)
    {
        return $this->reservationRepository->create($userId, $avaDate, $avaTime, $endTime);
    }

    public function deleteReservation($reservation)
    {
        $this->reservationRepository->delete($reservation);
    }

    public function existsDuplicateReservation($request)
    {
        $result = $this->reservationRepository->findReservationByDateAndTime($request->avaDate, $request->avaTime);
        return !empty($result);
    }

    public function calculateReservationEndTime($request, $useTime)
    {
        return date('H:i:s', strtotime("{$request->time} +{$useTime} minute -1 second"));
    }

    public function getMappingAvailableDatesAndTimes()
    {
        $avaDatetimes = $this->reservationRepository->getAvailableDatetimes();

        $avaDates = [];
        $avaTimes = [];
        foreach ($avaDatetimes as $datetime) {
            $avaDates[] = $datetime->available_date;

            $tmpAvaTimes = toArrayFromArrayColumn($datetime->available_times);
            $avaTimes[$datetime->available_date] = $tmpAvaTimes;
        }

        return compact('avaDates', 'avaTimes');
    }

    public function getReservations()
    {
        return $this->reservationRepository->getReservations();
    }

    public function getHolidays()
    {
        $holidays = Yasumi::create('Japan', date('Y'), 'ja_JP');
        return array_values($holidays->getHolidayDates());
    }

    public function saveAvailableDatetime($request)
    {
        $datetime = $request['datetime'];
        $date = substr($datetime, 0, 10);
        $time = substr($datetime, 11, 15);
        $monthCount = date('t', strtotime($date));
        $nonDayDate = $date. '-';

        if ($request['isBulkWeekend']) {
            $strategy = new InsertStrategy(new WeekendInsertStrategy($monthCount, $nonDayDate, $this->availableReservationDatetimeRepository));
        } elseif ($request['isBulkMonth']) {
            $strategy = new InsertStrategy(new MonthInsertStrategy($monthCount, $nonDayDate, $this->availableReservationDatetimeRepository));
        } elseif ($request['isBulkDay']) {
            $strategy = new InsertStrategy(new DayInsertStrategy($date, $this->availableReservationDatetimeRepository));
        } else {
             $strategy = new InsertStrategy(new SingleInsertStrategy($date, $time, $this->availableReservationDatetimeRepository));           
        }
        
        $strategy->insert();
    }
}
