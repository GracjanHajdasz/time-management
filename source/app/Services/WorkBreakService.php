<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkBreak;
use App\Queries\WorkBreakQuery;
use App\Models\WorkSession;

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

    public function getTodayBreakMinutes(User $user): int
    {
        $sessions = $user->workSessions()
            ->whereDate('started_at', today())
            ->get();
        
        $totalMinutes = 0;
        foreach( $sessions as $session ){
            $totalMinutes += $this->workBreakQuery->calculateBreakMinutes($session);
        }

        return (int) $totalMinutes;
    }

    public function getThisWeekBreakMinutes(User $user): int
    {
        $now = now();
        $sessions = $user->workSessions()->whereBetween('started_at', [
            $now->copy()->startOfWeek(),
            $now->copy()->endOfWeek(),
        ])->get();

        $totalMinutes = 0;
        foreach( $sessions as $session ){
            $totalMinutes += $this->workBreakQuery->calculateBreakMinutes($session);
        }

        return (int) $totalMinutes;
    }

    public function getThisMonthBreakMinutes(User $user): int
    {
        $now = now();
        $sessions = $user->workSessions()->whereBetween('started_at', [
            $now->copy()->startOfMonth(),
            $now->copy()->endOfMonth(),
        ])->get();

        $totalMinutes = 0;
        foreach( $sessions as $session ){
            $totalMinutes += $this->workBreakQuery->calculateBreakMinutes($session);
        }

        return (int) $totalMinutes;
    }
}