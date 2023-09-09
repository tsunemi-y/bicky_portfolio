<?php

namespace App\Providers;

use App\Repositories\UserRepository;
use App\Repositories\AdminRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ReservationRepository;
use App\Repositories\GoogleCalendarRepository;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\Interfaces\AdminRepositoryInterface;
use App\Repositories\AvailableReservationDatetimeRepository;
use App\Repositories\Interfaces\ReservationRepositoryInterface;
use App\Repositories\Interfaces\GoogleCalendarRepositoryInterface;
use App\Repositories\Interfaces\AvailableReservationDatetimeRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(AvailableReservationDatetimeRepositoryInterface::class, AvailableReservationDatetimeRepository::class);
        $this->app->bind(GoogleCalendarRepositoryInterface::class, GoogleCalendarRepository::class);
        $this->app->bind(ReservationRepositoryInterface::class, ReservationRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(AdminRepositoryInterface::class, AdminRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (\App::environment('production')) {
            \URL::forceScheme('https');
        }
    }
}
