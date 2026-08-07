<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\EmployeeService;
use Inertia\Response;
use App\Services\WorkSessionService;
use App\Data\EmployeeData;
use App\Http\Requests\UpdateEmployeeRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;

class EmployeeController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected EmployeeService $employeeService,
        protected WorkSessionService $workSessionService,
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
            'employee' => EmployeeData::from($employee),
            'employeeStats' => $this->employeeService->getEmployeeStats($employee),
            'employeeWorkSessions' => $this->workSessionService->getUserSessions($employee),
        ]);
    }

    public function update(
        UpdateEmployeeRequest $request,
        User $employee
    ): RedirectResponse
    {
        $this->authorize('update', $employee);
        $this->employeeService->updateEmployee(
            $employee,
            $request->validated()
        );

        return back()->with(
            'success',
           'Employee updated.'
        );
    }

    public function destroy(User $employee): RedirectResponse
    {
        $this->authorize('delete', $employee);

        $this->employeeService->deleteEmployee($employee);

        return redirect()
            ->route('admin.employees.index')
            ->with('success', 'Employee deleted.');
    }
}