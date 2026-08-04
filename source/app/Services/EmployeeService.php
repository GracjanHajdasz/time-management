<?php

namespace App\Services;

use App\Data\EmployeeStatsData;
use App\Data\EmployeeData;
use App\Models\User;
use App\Services\WorkSessionService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EmployeeService
{
    public function __construct(
        protected WorkSessionService $workSessionService,
        protected WorkBreakService $workBreakService,
    ) {}

    public function getEmployees(): LengthAwarePaginator
    {
        $employees = User::role('employee')
            ->paginate(7);
        $employees->through(
            fn(User $employee) => EmployeeData::from($employee)
        );

        return $employees;
    }

    public function getEmployeeStats(User $employee): EmployeeStatsData
    {
        return new EmployeeStatsData(
            todayWorkMinutes: $this->workSessionService
                ->getTodayWorkMinutes($employee),
            
            monthWorkMinutes: $this->workSessionService
                ->getThisMonthWorkMinutes($employee),
            
            weekWorkMinutes: $this->workSessionService
                ->getThisWeekWorkMinutes($employee),
            
            todayBreakMinutes: $this->workBreakService
                ->getTodayBreakMinutes($employee),

            weekBreakMinutes: $this->workBreakService
                ->getThisWeekBreakMinutes($employee),

            monthBreakMinutes: $this->workBreakService
                ->getThisMonthBreakMinutes($employee),
        );
            
    }
}