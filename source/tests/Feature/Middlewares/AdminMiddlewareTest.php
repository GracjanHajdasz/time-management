<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::create(['name' => 'admin']);
    Role::create(['name' => 'employee']);
    app()[\Spatie\Permission\PermissionRegistrar::class]
        ->forgetCachedPermissions();
});

it('allows admin to access admin dashboard', function () {
    $admin = User::factory()->create();

    $admin->assignRole('admin');

    $this->actingAs($admin)
        ->get('/admin')
        ->assertOk();
});

it('forbids employee from accessing admin dashboard', function () {
    $employee = User::factory()->create();

    $employee->assignRole('employee');

    $this->actingAs($employee)
        ->get('/admin')
        ->assertForbidden();
});