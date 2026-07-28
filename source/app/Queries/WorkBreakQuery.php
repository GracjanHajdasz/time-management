<?php

namespace App\Queries;

use App\Models\WorkBreak;
use App\Models\WorkSession;

class WorkBreakQuery
{
    public function getActiveBreak(WorkSession $session): ?WorkBreak
    {
        return $session->workBreaks()
            ->whereNull('ended_at')
            ->first();
    }

    public function getSessionBreaks(WorkSession $session)
    {
        return $session->workBreaks()
            ->whereNotNull('ended_at')
            ->get();
    }
}