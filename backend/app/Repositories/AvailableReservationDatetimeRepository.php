<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\AvailableReservationDatetime;
use App\Repositories\Interfaces\AvailableReservationDatetimeRepositoryInterface;

class AvailableReservationDatetimeRepository implements AvailableReservationDatetimeRepositoryInterface
{
    public function __construct(
        private AvailableReservationDatetime $availableReservationDatetime,
    )
    {
    }

    public function bulkInsert($insertDatetimes)
    {
        try {
            DB::beginTransaction();
            
            DB::table('available_reservation_datetimes')->insert($insertDatetimes);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            Log::info($e);
        }
    }

    public function getIdByDateAndTime($date, $time)
    {
        return $this->availableReservationDatetime->where('available_date', $date)
            ->where('available_time', $time)
            ->get('id')
            ->toArray()[0]['id'];
    }

    public function create($date, $time) 
    {
        $this->availableReservationDatetime->create([
            'available_date' => $date,
            'available_time' => $time,
        ]);
    }

    public function delete($availableReservationDatetime) 
    {
        $availableReservationDatetime->delete();
    }
}