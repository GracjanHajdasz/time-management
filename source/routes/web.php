<?php

use App\Http\Controllers\WorkSessionController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::post('/work-sessions/start', [WorkSessionController::class, 'start'])
        ->name('work-session.start');
});

require __DIR__.'/settings.php';
