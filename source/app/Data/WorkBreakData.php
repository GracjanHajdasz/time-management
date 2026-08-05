<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class WorkBreakData extends Data
{
    public function __construct(
        public int $id,
        public int $workSessionId,
        public string $startedAt,
        public ?string $endedAt,
    ) {}
}
