<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class EmployeeStatsData extends Data
{
    public function __construct(
        public int $todayWorkMinutes,
        public int $weekWorkMinutes,
        public int $monthWorkMinutes,
        public int $todayBreakMinutes,
        public int $weekBreakMinutes,
        public int $monthBreakMinutes,
    ) {}
}
