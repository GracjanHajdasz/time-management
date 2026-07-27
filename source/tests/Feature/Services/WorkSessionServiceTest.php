<?php

use App\Models\User;
use App\Services\WorkSessionService;
use Carbon\Carbon;
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

it('calculates total work minutes for today', function () {
    $user = User::factory()->create();
    $service = new WorkSessionService();
    $today = Carbon::today();

    $user->workSessions()->create([
        'started_at' => $today->copy()->setTime(8,0),
        'ended_at' => $today->copy()->setTime(12,0),
    ]);
    $user->workSessions()->create([
        'started_at' => $today->copy()->setTime(13,0),
        'ended_at' => $today->copy()->setTime(17,0),
    ]);

    $totalMinutes = $service->getTodayWorkMinutes($user);

    expect($totalMinutes)->toBe(480);
});

it('calculates minutes for active session', function () {
    Carbon::setTestNow('2026-07-27 16:00:00');

    $user = User::factory()->create();
    $service = new WorkSessionService();

    $user->workSessions()->create([
        'started_at' => '2026-07-27 08:00:00',
    ]);

    $totalMinutes = $service->getTodayWorkMinutes($user);

    expect($totalMinutes)->toBe(480);

    Carbon::setTestNow();
});