<?php

use App\Http\Controllers\WorkSessionController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::post('/work-sessions/start', [WorkSessionController::class, 'start'])
        ->name('work-session.start');
    Route::post('/work-sessions/end', [WorkSessionController::class, 'end'])
        ->name('/work-session.end');
});

require __DIR__.'/settings.php';
