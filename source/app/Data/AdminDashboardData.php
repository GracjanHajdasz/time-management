<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class AdminDashboardData extends Data
{
    public function __construct(
        public int $employeesCount,
        public int $activeSessions,
    ) {}
}
