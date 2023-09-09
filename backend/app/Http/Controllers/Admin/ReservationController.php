<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ReservationService;
use App\UseCases\Admins\ReservationUseCase;
use App\Models\AvailableReservationDatetime;
use App\UseCases\Admins\AvailableReservationUseCase;
use App\Http\Requests\Admins\CreateAvailableFormRequest;

class ReservationController extends Controller
{
    public function __construct(
        private ReservationUseCase $reservationUseCase,
        private AvailableReservationUseCase $availableReservationUseCase,
        private ReservationService $reservationService,
    )
    {
    }

    public function index()
    {
        return $this->reservationUseCase->getReservationInfo();
    }

    public function store(CreateAvailableFormRequest $request)
    {
        $this->reservationService->saveAvailableDatetime($request);
    }

    public function destroy(AvailableReservationDatetime $availableReservationDatetime)
    {
        $this->availableReservationUseCase->delete($availableReservationDatetime);
    }
}
