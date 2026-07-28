<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkBreak;
use App\Queries\WorkBreakQuery;

class WorkBreakService
{
    public function __construct(
        protected WorkSessionService $workSessionService,
        protected WorkBreakQuery $workBreakQuery,
    ) {}

    public function startBreak(User $user): WorkBreak|false
    {
        $activeSession = $this->workSessionService->getActiveSession($user);
        if (! $activeSession){
            return false;
        }
        $activeBreak = $this->workBreakQuery->getActiveBreak($activeSession);
        if ($activeBreak) {
            return false;
        }

        return $activeSession->workBreaks()
            ->create([
                'started_at' => now(),
            ]);
    }

    public function endBreak(User $user): WorkBreak|false
    {
        $activeSession = $this->workSessionService->getActiveSession($user);
        if (! $activeSession) {
            return false;
        }

        $activeBreak = $this->workBreakQuery->getActiveBreak($activeSession);
        if (! $activeBreak) {
            return false;
        }

        $activeBreak->update([
            'ended_at' => now(),
        ]);

        return $activeBreak;
    }
}