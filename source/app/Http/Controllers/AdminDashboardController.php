<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminDashboardService;

class AdminDashboardController extends Controller
{
    public function __construct(
        protected AdminDashboardService $adminDashboardService,
    ) {}

    public function index()
    {
        return inertia()->render('admin/dashboard', [
            'stats' => $this->adminDashboardService->getStats(),
        ]);
    }
}
