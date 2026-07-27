<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\WorkBreakService;
use Illuminate\Support\Facades\Auth;
use App\Services\WorkSessionService;


class DashboardController extends Controller
{
    public function index(WorkSessionService $workSessionService, WorkBreakService $workBreakService)
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
        $activeBreak = null;

        if ($activeSession) {
            $activeBreak = $activeBreak = $workBreakService->getActiveBreak($user);
        }
        
        $todayWorkMinutes = $workSessionService->getTodayWorkMinutes($user);
        $weekWorkMinutes = $workSessionService->getThisWeekWorkMinutes($user);
        $monthWorkMinutes = $workSessionService->getThisMonthWorkMinutes($user);

        return inertia('dashboard', [
            'activeSession' => $activeSession,
            'userSessions' => $userSessions,
            'todayWorkMinutes' => $todayWorkMinutes,
            'weekWorkMinutes' => $weekWorkMinutes,
            'monthWorkMinutes' => $monthWorkMinutes,
            'activeBreak' => $activeBreak
        ]);
    }
}