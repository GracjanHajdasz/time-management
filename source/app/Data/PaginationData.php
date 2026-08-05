<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class PaginationData extends Data
{
    public function __construct(
        public array $data,
        public int $currentPage,
        public int $lastPage,
        public int $perPage,
        public int $total,
    ) {}
}