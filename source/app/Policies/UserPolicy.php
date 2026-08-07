<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view employees');
    }


    public function create(User $user): bool
    {
        return $user->can('create employees');
    }


    public function update(User $user, User $employee): bool
    {
        return $user->can('edit employees');
    }


    public function delete(User $user, User $employee): bool
    {
        return $user->can('delete employees');
    }
}