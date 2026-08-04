<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function index(DashboardService $dashboardService)
    {
        $employee = Auth::user();

        $dashboard = $dashboardService->getDashboard($employee);

        return inertia('dashboard', [
            'dashboard' => $dashboard,
        ]);

    }
}