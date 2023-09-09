<?php

namespace App\UseCases\Admins;

use App\Services\ReservationService;

class ReservationUseCase
{
    public function __construct(
        private ReservationService $reservationService,
    ) 
    {    
    }

    public function getReservationInfo()
    {
        $avaDatetimes = $this->reservationService->getAvailableDatetimes();

        $reservations = $this->reservationService->getReservations();
        
        $holidays = $this->reservationService->getHolidays();

        return compact('avaDatetimes', 'reservations', 'holidays');
    }

}
