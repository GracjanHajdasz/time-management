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
            'todayWorkMinutes' => $this->workSessionService
                ->getTodayWorkMinutes($employee),
            'weekWorkMinutes' => $this->workSessionService
                ->getThisWeekWorkMinutes($employee),

            'monthWorkMinutes' => $this->workSessionService
                ->getThisMonthWorkMinutes($employee),
        ];
    }
}