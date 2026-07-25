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

it('does not allow user to start a second work session', function () {
    $user = User::factory()->create();
    $service = new WorkSessionService();

    $firstSession = $service->startWork($user);
    $secondSession = $service->startWork($user);

    expect($secondSession)->toBeFalse();
    expect($user->workSessions()->count())->toBe(1);
});

it('allows user to end an active work session', function () {
    $user = User::factory()->create();
    $service = new WorkSessionService();

    $session = $service->startWork($user);
    $endedSession = $service->endWork($user);

    expect($endedSession)->not->toBeFalse();
    expect($endedSession->id)->toBe($session->id);
    expect($endedSession->ended_at)->not->toBeNull();
}); 