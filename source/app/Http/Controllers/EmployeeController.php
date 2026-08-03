<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\EmployeeService;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function __construct(
        protected EmployeeService $employeeService,
    ) {}

    public function index(): Response
    {
        return inertia()->render('admin/employees/index', [
            'employees' => $this->employeeService->getEmployees(),
        ]);
    }

    public function show(User $employee): Response
    {
        return inertia()->render('admin/employees/show', [
            'employee' => $employee,
            'employeeStats' => $this->employeeService->getEmployeeStats($employee),
        ]);
    }
}