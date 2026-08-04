<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Carbon\Carbon;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]

class WorkSessionData extends Data
{
    public function __construct(
        public int $id,
        public Carbon $startedAt,
        public ?Carbon $endedAt,
    ) {}
}
