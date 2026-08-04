<?php

namespace App\Services;

use App\Data\WorkSessionData;
use App\Models\User;
use App\Models\WorkSession;
use Carbon\Carbon;
use App\Queries\WorkBreakQuery;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class WorkSessionService
{
    public function __construct(
        protected WorkBreakQuery $workBreakQuery
    ) {}

    public function getUserSessions(User $user): LengthAwarePaginator
    {
        return $user->workSessions()
            ->latest('started_at')
            ->paginate(20);
    }

    public function getActiveSession(User $user): ?WorkSession
    {
        return $user->workSessions()
            ->whereNull('ended_at')
            ->first();
    }

    public function startWork(User $user): WorkSession|false
    {
        $activeSession = $this->getActiveSession($user);
        if($activeSession) {
            return false;
        }

        return $user->workSessions()->create([
            'started_at' => now(),
        ]);
    }

    public function endWork(User $user): WorkSession|false
    {
        $activeSession = $this->getActiveSession($user);
        if(!$activeSession) {
            return false;
        }

        $activeBreak = $this->workBreakQuery->getActiveBreak($activeSession);

        if($activeBreak) {
            return false;
        }


        $activeSession->update([
            'ended_at' => now(),
        ]);
        return $activeSession;
    }

    public function getTodayWorkMinutes(User $user): int
    {
        $todaySessions = $user->workSessions()
            ->whereDate('started_at', today())
            ->get();
        $totalMinutes = 0;

        foreach ($todaySessions as $session) {
            $totalMinutes += $this->calculateSessionMinutes($session);
        }

        return (int) $totalMinutes;
    }

    public function getThisWeekWorkMinutes(User $user): int
    {
        $now = Carbon::now();
        $totalMinutes = 0;
        $thisWeekSessions = $user->workSessions()->whereBetween('started_at', [
            $now->copy()->startOfWeek(),
            $now->copy()->endOfWeek(),
        ])->get();

        foreach($thisWeekSessions as $session) {
            $totalMinutes += $this->calculateSessionMinutes($session);
        }
        
        return (int) $totalMinutes;
    }

    public function getThisMonthWorkMinutes(User $user): int
    {
        $now = Carbon::now();
        $totalMinutes = 0;
        $thisMonthSessions = $user->workSessions()->whereBetween('started_at', [
            $now->copy()->startOfMonth(),
            $now->copy()->endOfMonth(),
        ])->get();

        foreach($thisMonthSessions as $session) {
            $totalMinutes += $this->calculateSessionMinutes($session);
        }
    
        return (int) $totalMinutes;
    }

    private function calculateSessionMinutes(WorkSession $session): int
    {
        $now = now();

        //get work minutes
        if (! $session->ended_at) {
            $workMinutes = $session
                ->started_at
                ->diffInMinutes($now);
        } else {
            $workMinutes = $session
                ->started_at
                ->diffInMinutes($session->ended_at);
        }

        //get break minutes
        $breakMinutes = $this->workBreakQuery->calculateBreakMinutes($session);

        return (int) $workMinutes - $breakMinutes;
    }
}