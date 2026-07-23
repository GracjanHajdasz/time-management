<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkSession;

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
}