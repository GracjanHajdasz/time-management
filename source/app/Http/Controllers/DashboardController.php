<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Services\WorkSessionService;


class DashboardController extends Controller
{
    public function index(WorkSessionService $workSessionService)
    {
        $user = Auth::user();

        if (! $user instanceof User) {
            abort(403);
        }

        $activeSession = $user->workSessions()
            ->whereNull('ended_at')
            ->first();
        $userSessions = $user->workSessions()
            ->latest('started_at')
            ->get();
        
        $todayWorkMinutes = $workSessionService->getTodayWorkMinutes($user);

        return inertia('dashboard', [
            'activeSession' => $activeSession,
            'userSessions' => $userSessions,
            'todayWorkMinutes' => $todayWorkMinutes,
        ]);
    }
}