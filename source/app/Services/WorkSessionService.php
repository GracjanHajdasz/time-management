<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkSession;
use Carbon\Carbon;

class WorkSessionService
{
    private function getActiveSession(User $user): ?WorkSession
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
            if (!$session->ended_at) {
                $totalMinutes += $session->started_at
                    ->diffInMinutes(Carbon::now());
                } else {
                    $totalMinutes += $session->started_at
                    ->diffInMinutes($session->ended_at);
                }
        }

        return (int) $totalMinutes;
    }
}