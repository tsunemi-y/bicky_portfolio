<?php

namespace App\Repositories;


use Carbon\Carbon;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use App\Models\AvailableReservationDatetime;
use App\Repositories\Interfaces\ReservationRepositoryInterface;

class ReservationRepository implements ReservationRepositoryInterface
{
    public function __construct(
        private Reservation $reservation, 
    ) 
    {
    }

    public function getAvailableDatetimes()
    {
        return AvailableReservationDatetime::query()
            ->select(DB::raw('
            available_date
            ,json_agg(json_build_object(\'id\', id, \'available_time\', available_time) ORDER BY available_time) AS available_times
        '))
            ->whereNotExists(function($query) {
            $query->select(DB::raw(1))
                ->from('reservations')
                ->whereRaw('CAST(available_date AS DATE) = CAST(reservation_date AS DATE)')
                ->whereRaw('CAST(available_time AS TIME) BETWEEN CAST(reservation_time AS TIME) AND CAST(end_time AS TIME)');
            })
            ->groupBy('available_date')
            ->get()
            ->mapWithKeys(function ($item) {
                $decodedItem = json_decode($item);

                $times = json_decode($decodedItem->available_times, true);

                $times = array_map(function ($time) {
                    $time['available_time'] = Carbon::createFromFormat('H:i:s', trim($time['available_time'], '""'))->format('H:i');
                    return $time;
                }, $times);

                return [$item->available_date => $times];
            });
    }

    public function getReservations()
    {
        return Reservation::query()
            ->join('users', 'reservations.user_id', 'users.id')
            ->orderBy('reservation_date', 'asc')
            ->orderBy('reservation_time', 'asc')
            ->get(['parent_name', 'reservation_date', 'reservation_time'])
            ->groupBy('reservation_date')
            ->map(function ($dateGroup) {
                return $dateGroup->map(function ($item) {
                    return [
                        'reservationName' => $item->parent_name,
                        'reservationTime' => $item->reservation_time
                    ];
                });
            });
    }

    public function delete($reservation)
    {
        $reservation->delete();
    }

    public function create($userId, $avaDate, $avaTime, $endTime)
    {
        return $this->reservation->create([
            'user_id' => $userId,
            'reservation_date' => $avaDate,
            'reservation_time' => $avaTime,
            'end_time' => $endTime,
        ]);
    }

    public function findReservationByDateAndTime($date, $time)
    {
        return $this->reservation->query()
            ->where('reservation_date', $date)
            ->where('reservation_time', $time)
            ->first();
    }

    public function getTodaysReservations($today)
    {
        return $this->reservation->with('user')
            ->where('reservation_date', '=', $today)
            ->oldest('reservation_time')
            ->get();
    }

    public function getCurrentMonthReservationSummary()
    {
        return $this->reservation->query()
            ->join('users', 'reservations.user_id', '=', 'users.id')
            ->whereRaw("reservation_date BETWEEN date_trunc('month', CURRENT_DATE) AND (date_trunc('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day')::date")
            ->select([
                DB::raw('count(reservations.id) as total_reservation'),
                DB::raw('sum(cast(users.fee as integer)) as total_amount')
            ])
            ->first();
    }
}