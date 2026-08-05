<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class DashboardData extends Data
{
    public function __construct(
        public ?WorkSessionData $activeSession,
        public ?WorkBreakData $activeBreak,
        public EmployeeStatsData $stats,
        public PaginationData $sessions,
    ) {}
}