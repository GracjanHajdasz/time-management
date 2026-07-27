<?php

use App\Http\Controllers\WorkSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WorkBreakController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::post('/work-sessions/start', [WorkSessionController::class, 'start'])
        ->name('work-session.start');
    Route::post('/work-sessions/end', [WorkSessionController::class, 'end'])
        ->name('work-session.end');
    Route::post('/work-breaks/start', [WorkBreakController::class, 'start'])
        ->name('work-break.start');
    Route::post('/work-breaks/end', [WorkBreakController::class, 'end'])
        ->name('work-break.end');
});

require __DIR__.'/settings.php';
