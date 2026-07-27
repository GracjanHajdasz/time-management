<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkSession;
use Carbon\Carbon;

class WorkSessionService
{
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
        if (! $session->ended_at) {
            return (int) $session->started_at
                ->diffInMinutes(now());
        }

        return (int) $session->started_at
            ->diffInMinutes($session->ended_at);
    }
}