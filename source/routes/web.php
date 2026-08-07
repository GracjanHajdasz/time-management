<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\WorkSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WorkBreakController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminReportController;
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

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');
    Route::get('/admin/employees', [EmployeeController::class, 'index'])
        ->name('admin.employees.index');
    Route::get('/admin/employees/{employee}', [EmployeeController::class, 'show'])
        ->name('admin.employees.show');
    Route::post('/reports/employees', [
            AdminReportController::class,
            'generate'
        ])->name('admin.reports.employees');
});

require __DIR__.'/settings.php';
