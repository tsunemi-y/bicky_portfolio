<?php

namespace App\Repositories\Interfaces;

interface AvailableReservationDatetimeRepositoryInterface
{
    public function bulkInsert($insertDatetimes);

    public function getIdByDateAndTime($date, $time);

    public function create($date, $time);

    public function delete($availableReservationDatetime);
}