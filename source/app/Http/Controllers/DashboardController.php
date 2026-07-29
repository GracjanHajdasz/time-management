<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Services\WorkSessionService;
use App\Queries\WorkBreakQuery;


class DashboardController extends Controller
{
    public function index(
        WorkSessionService $workSessionService,
        WorkBreakQuery $workBreakQuery
        )
    {
        $user = Auth::user();

        if (! $user instanceof User) {
            abort(403);
        }

        $activeSession = $workSessionService->getActiveSession($user);
        $userSessions = $user->workSessions()
            ->latest('started_at')
            ->get();
        $activeBreak = null;

        if ($activeSession) {
            $activeBreak = $workBreakQuery->getActiveBreak($activeSession);
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