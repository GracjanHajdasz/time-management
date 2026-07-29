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

    public function calculateBreakMinutes(WorkSession $workSession): int
    {
        $breaks = $this->getSessionBreaks($workSession);
        $activeBreak = $this->getActiveBreak($workSession);

        foreach( $breaks as $break) {
            $minutes += $break->started_at->diffInMinutes($break->ended_at);
        }

        if ($activeBreak) {
            $minutes += $activeBreak->started_at
                ->diffInMinutes(now());
        }

        return (int) $minutes;
    }
}