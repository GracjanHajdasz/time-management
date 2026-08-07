<?php

namespace App\Http\Controllers;

use App\Jobs\GenerateEmployeeReportJob;
use Illuminate\Http\RedirectResponse;

class AdminReportController extends Controller
{
    public function generate(): RedirectResponse
    {
        GenerateEmployeeReportJob::dispatch(
            now()->month,
            now()->year
        );

        return back()->with(
            'success',
            'Raport został dodany do kolejki.'
        );
    }
}