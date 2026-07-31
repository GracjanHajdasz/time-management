<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

uses(RefreshDatabase::class);

it('allows admin to access admin dashboard', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get('/admin')
        ->assertOk();
});

it('forbids employee from accessing admin dashboard', function () {
    $employee = User::factory()->create([
        'role' => 'employee',
    ]);

    $this->actingAs($employee)
        ->get('/admin')
        ->assertForbidden();
});