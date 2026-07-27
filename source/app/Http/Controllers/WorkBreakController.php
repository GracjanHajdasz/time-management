<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\WorkBreakService;

class WorkBreakController extends Controller
{
    public function start(WorkBreakService $workBreakService)
    {
        $user = Auth::user();
        $break = $workBreakService->startBreak($user);

        if ($break === false){
            return back()->withErrors([
                'status'=>'Nie można rozpocząć przerwy',
            ]);
        }
        return back()->with('success', 'Rozpoczęto przerwę');
    }

    public function end(WorkBreakService $workBreakService)
    {
        $user = Auth::user();
        $break = $workBreakService->endBreak($user);

        if ($break === false){
            return back()->withErrors([
                'status'=>'Użytkownik nie ma przerwy do zakończenia',
            ]);
        }
        return back()->with('success', 'Zakończono przerwę przerwę');
    }
}
