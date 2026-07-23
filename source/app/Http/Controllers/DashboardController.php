<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (! $user instanceof User) {
            abort(403);
        }

        $activeSession = $user->workSessions()
            ->whereNull('ended_at')
            ->first();

        return inertia('dashboard', [
            'activeSession' => $activeSession,
        ]);
    }
}