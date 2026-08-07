<?php

namespace App\Jobs;

use App\Services\ReportService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class GenerateEmployeeReportJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public int $month,
        public int $year
    ) {}

    public function handle(ReportService $reportService): void
    {
        $reports = $reportService->generateEmployeeReport(
            $this->month,
            $this->year
        );

        logger()->info('Report generated', [
            'employees_count' => $reports->count(),
        ]);
    }
}