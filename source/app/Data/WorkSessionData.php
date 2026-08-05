<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]

class WorkSessionData extends Data
{
    public function __construct(
        public int $id,
        public string $startedAt,
        public ?string $endedAt,
    ) {}
}
