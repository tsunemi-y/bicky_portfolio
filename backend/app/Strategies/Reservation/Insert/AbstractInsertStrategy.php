<?php

namespace App\Strategies\Reservation\Insert;

use Yasumi\Yasumi;
use App\Consts\ConstReservation;

abstract class AbstractInsertStrategy
{
    protected function createInsertDatetimes($monthCount, $nonDayDate, $targetInsertWeeks)
    {
        $holidays = Yasumi::create('Japan', date('Y'), 'ja_JP');

        $insertDatetimes = [];
        for ($i = 1; $i <= $monthCount; $i++) {
            $week = (int)date('w', strtotime($nonDayDate. $i));
            if (!in_array($week, $targetInsertWeeks, true)) continue;
            if ($holidays->isHoliday(new \DateTime($nonDayDate. $i))) continue;
            foreach (ConstReservation::AVAILABLE_TIME_LIST as $time) {
                $insertDatetimes[] = [
                    'available_date' => $nonDayDate . $i,
                    'available_time' => $time,
                ];
            }
        }

        return $insertDatetimes;
    }
}