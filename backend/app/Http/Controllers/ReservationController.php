<?php

namespace App\Http\Controllers;

use App\Models\Reservation;

use App\Services\MailService;
use App\Services\ReservationService;
use App\UseCases\ReservationUseCase;
use App\Services\GoogleCalendarService;
use App\Services\LineMessengerServices;
use App\Http\Requests\ReservationFormRequest;

class ReservationController extends Controller
{
    public function __construct(
        private ReservationService $reservationService, 
        private GoogleCalendarService $googleCalendarService,
        private MailService $mailService, 
        private LineMessengerServices $lineMessengerServices,
        private ReservationUseCase $reservationUseCase,
    )
    {
    }

    public function index()
    {
        return $this->reservationService->getAvailableDatetimes();
    }

    public function store(ReservationFormRequest $request)
    {
        return $this->reservationUseCase->create($request);
    }

    public function show(Reservation $reservation)
    {
        return [
            'date' => $reservation->reservation_date,
            'time' => $reservation->reservation_time
        ];
    }

    public function destroy(Reservation $reservation)
    {
        return $this->reservationUseCase->delete($reservation);
    }
}
