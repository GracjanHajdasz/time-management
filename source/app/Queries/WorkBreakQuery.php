<?php

namespace App\Queries;

use App\Models\User;
use App\Models\WorkBreak;

class WorkBreakQuery
{
    public function getActiveBreak(User $user): ?WorkBreak
    {
        $activeSession = $user->workSessions()
            ->whereNull('ended_at')
            ->first();

        if (! $activeSession) {
            return null;
        }

        return $activeSession->workBreaks()
            ->whereNull('ended_at')
            ->first();
    }
}