<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'view employees',
            'create employees',
            'edit employees',
            'delete employees',

            'view work sessions',
            'export work sessions',
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
            ]);
        }


        $admin = Role::create([
            'name' => 'admin',
        ]);

        $employee = Role::create([
            'name' => 'employee',
        ]);


        $admin->givePermissionTo(Permission::all());

        $employee->givePermissionTo([
            'view work sessions',
        ]);
    }
}