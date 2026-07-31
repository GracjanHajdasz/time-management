<?php

namespace App\Services;

use App\Services\EmployeeService;
use App\Models\User;

class AdminDashboardService
{
    public function __construct(protected EmployeeService $employeeService) {}

    public function getStats(): array
    {
        return [
            'employeesCount' => User::role('employee')->count(),
            
            'activeSessions' => User::role('employee')
                ->whereHas('workSessions', function ($query) {
                    $query->whereNull('ended_at');
                })->count(),
        ];
    }
}