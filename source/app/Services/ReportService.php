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

    public function exportEmployeeReportToCsv(
        int $month,
        int $year
    ): string
    {
        $reports = $this->generateEmployeeReport(
            $month,
            $year
        );

        $path = "reports/employees-{$year}-{$month}.csv";

        $handle = fopen(
            storage_path("app/private/{$path}"),
            'w'
        );

        fputcsv($handle, [
            'Employee Name',
            'Email',
            'Worked Minutes',
        ]);

        foreach ($reports as $report) {
            fputcsv($handle, [
                $report->employeeName,
                $report->email,
                $report->workedMinutes,
            ]);
        }

        fclose($handle);

        return $path;
    }
}