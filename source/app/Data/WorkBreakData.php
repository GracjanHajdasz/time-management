<?php

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class WorkBreakData extends Data
{
    public function __construct(
        public int $id,
        public int $workSessionId,
        public Carbon $startedAt,
        public ?Carbon $endedAt,
    ) {}
}
