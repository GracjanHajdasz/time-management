<?php

namespace App\Services;

use App\Models\User;
use App\Services\WorkSessionService;
use Illuminate\Database\Eloquent\Collection;

class EmployeeService
{
    public function __construct(
        protected WorkSessionService $workSessionService,
    ) {}

    public function getEmployees(): Collection
    {
        return User::role('employee')
            ->get();
    }

    public function getEmployeeStats(User $employee): array
    {
        return [
            'todayMinutes' => $this->workSessionService
                ->getTodayWorkMinutes($employee),
            'weekMinutes' => $this->workSessionService
                ->getThisWeekWorkMinutes($employee),

            'monthMinutes' => $this->workSessionService
                ->getThisMonthWorkMinutes($employee),
        ];
    }
}