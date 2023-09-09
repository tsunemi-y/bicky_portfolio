<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user/login ', [AuthController::class, 'login'])->name('login');
Route::post('/user/store', [UserController::class, 'store'])->name('signup');

Route::group(['middleware' => 'jwt'], function() {
    Route::get('/reservation', [ReservationController::class, 'index'])->name('ReservationIndex');
    Route::get('/reservation/{reservation}', [ReservationController::class, 'show'])->name('show');
    Route::post('/reservation', [ReservationController::class, 'store'])->name('ReservationStore');
    Route::delete('/reservation/{reservation}', [ReservationController::class, 'destroy'])->name('destroy');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::post('/user/login ', [AdminAuthController::class, 'login'])->name('login');

    Route::get('/reservation', [AdminReservationController::class, 'index'])->name('getReservation');
    Route::post('/reservation', [AdminReservationController::class, 'store'])->name('saveReservation');
    Route::delete('/reservation/{availableReservationDatetime}', [AdminReservationController::class, 'destroy'])->name('deleteDatetime');

    Route::get('/user', [AdminUserController::class, 'index'])->name('users');
    Route::get('/user/{user}', [AdminUserController::class, 'show'])->name('userDetail');
    Route::post('/user/sendReceipt', [AdminUserController::class, 'sendReceipt'])->name('sendReceipt');
    Route::put('/user/updateFee/{user}', [AdminUserController::class, 'updateFee'])->name('updateFee');
    Route::post('/user/sendEvaluation', [AdminUserController::class, 'sendEvaluation'])->name('sendEvaluation');
});
