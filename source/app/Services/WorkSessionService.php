<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkSession;

class WorkSessionService
{
    public function startWork(User $user): WorkSession|false
    {
        $activeSession = $user->workSessions()
            ->whereNull('ended_at')
            ->first();

        if($activeSession) {
            return false;
        }

        return $user->workSessions()->create([
            'started_at' => now(),
        ]);
    }
}