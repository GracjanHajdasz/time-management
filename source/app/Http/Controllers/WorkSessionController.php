<?php

namespace App\Http\Controllers;

use App\Services\WorkSessionService;
use Illuminate\Support\Facades\Auth;

class WorkSessionController extends Controller
{
    public function start(WorkSessionService $workSessionService)
    {
        $user = Auth::user();
        $session = $workSessionService->startWork($user);

        if($session === false) {
            return back()->withErrors([
                'status' => "Użytkownik ma aktywną sesję",
            ]);
        }

        return back()->with('success', 'Utworzono nową sesję');
    }

    public function end(WorkSessionService $workSessionService)
    {
        $user = Auth::user();
        $session = $workSessionService->endWork($user);

        if($session === false) {
            return back()->withErrors([
                'status' => 'Nie udało się zakończyć pracy.',
            ]);
        }

        return back()->with('success', 'Zakończono sesję');
    }
}
