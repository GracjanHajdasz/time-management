<?php

namespace App\Services;

use App\Data\EmployeeStatsData;
use App\Data\EmployeeData;
use App\Data\PaginationData;
use App\Models\User;
use App\Services\WorkSessionService;

class EmployeeService
{
    public function __construct(
        protected WorkSessionService $workSessionService,
        protected WorkBreakService $workBreakService,
    ) {}

    public function getEmployees(): PaginationData
    {
        $employees = User::role('employee')
            ->paginate(7);

        $employees->through(
            fn(User $employee) => EmployeeData::from($employee)
        );

        return new PaginationData(
            data: $employees->items(),
            currentPage: $employees->currentPage(),
            lastPage: $employees->lastPage(),
            perPage: $employees->perPage(),
            total: $employees->total(),
        );
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

    public function updateEmployee(
        User $employee,
        array $data
    ): User
    {
        $employee->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        return $employee;
    }

    public function deleteEmployee(User $employee): bool
    {
        return $employee->delete();
    }
}