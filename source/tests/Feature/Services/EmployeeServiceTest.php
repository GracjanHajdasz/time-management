<?php

use App\Models\User;
use App\Services\EmployeeService;
use Spatie\Permission\Models\Role;
use App\Models\WorkSession;

beforeEach(function () {

    Role::create([
        'name' => 'employee'
    ]);

    Role::create([
        'name' => 'admin'
    ]);

});


it('returns only employees', function () {

    $employee = User::factory()->create();
    $employee->assignRole('employee');

    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $service = app(EmployeeService::class);

    $employees = $service->getEmployees();

    expect($employees->total())
        ->toBe(1);

    expect($employees->items()[0]->id)
        ->toBe($employee->id);

});

it('returns employee work statistics', function () {

    $employee = User::factory()->create();

    $employee->assignRole('employee');


    WorkSession::factory()->create([
        'user_id' => $employee->id,
    ]);


    $service = app(EmployeeService::class);

    $stats = $service->getEmployeeStats($employee);


    expect($stats->todayWorkMinutes)
        ->toBe(480);

});