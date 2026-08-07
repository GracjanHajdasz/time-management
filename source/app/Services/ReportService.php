<?php

namespace App\Services;

use App\Data\EmployeeReportData;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

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

        $directory = storage_path('app/private/reports');

        if (! File::exists($directory)) {
            File::makeDirectory(
                $directory,
                0755,
                true
            );
        }

        $path = "{$directory}/employees-{$year}-{$month}.csv";

        $file = fopen($path, 'w');

        fputcsv($file, [
            'Employee Name',
            'Email',
            'Worked Minutes',
        ]);

        foreach ($reports as $report) {
            fputcsv($file, [
                $report->employeeName,
                $report->email,
                $report->workedMinutes,
            ]);
        }

        fclose($file);

        return $path;
    }
}