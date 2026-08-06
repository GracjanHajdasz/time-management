<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class EmployeeReportData extends Data
{
    public function __construct(
        public string $employeeName,
        public string $email,
        public int $workedMinutes,
    ) {}
}