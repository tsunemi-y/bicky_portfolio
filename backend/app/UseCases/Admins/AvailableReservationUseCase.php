<?php

namespace App\UseCases\Admins;

use App\Services\AvailableReservationDatetimeService;

class AvailableReservationUseCase
{
    public function __construct(
        private AvailableReservationDatetimeService $availableReservationDatetimeService,
    ) 
    {    
    }

    public function delete($availableReservationDatetime)
    {
        $this->availableReservationDatetimeService->delete($availableReservationDatetime);
    }

}
