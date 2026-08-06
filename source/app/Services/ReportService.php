<?php

namespace App\Services;

use App\Data\EmployeeReportData;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class ReportService
{
    public function __construct(
        protected WorkSessionService $workSessionService,
    ) {}

    public function generateEmployeeReport(
        int $month,
        int $year
    ): Collection
    {
        $start = Carbon::create($year, $month)
            ->startOfMonth();

        $end = Carbon::create($year, $month)
            ->endOfMonth();

        $employees = User::role('employee')->get();

        $reports = collect();

        foreach ($employees as $employee) {
            $reports->push(
                new EmployeeReportData(
                    employeeName: $employee->name,
                    email: $employee->email,
                    workedMinutes: $this->workSessionService
                        ->getWorkMinutesForPeriod(
                            $employee,
                            $start,
                            $end
                        ),
                )
            );
        }

        return $reports;
    }
}