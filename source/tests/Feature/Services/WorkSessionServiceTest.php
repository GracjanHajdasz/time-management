<?php

use App\Models\User;
use App\Services\WorkSessionService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows user to start work', function () {
    $user =  User::factory()->create();

    $service = new WorkSessionService();
    $session = $service->startWork($user);

    expect($session)->not->toBeFalse();
    expect($session->user_id)->toBe($user->id);
    expect($session->started_at)->not->toBeNull();
    expect($session->ended_at)->toBeNull();
});