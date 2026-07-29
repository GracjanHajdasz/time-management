<?php

use App\Models\User;
use App\Models\WorkBreak;
use App\Services\WorkSessionService;
use App\Services\WorkBreakService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Queries\WorkBreakQuery;

uses(RefreshDatabase::class);

it('allows to start break during active session', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );

    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );

    $session = $workSessionService->startWork($user);
    $break = $workBreakService->startBreak($user);

    expect($break)->toBeInstanceOf(WorkBreak::class);
    expect($break->work_session_id)->toBe($session->id);
    expect($break->started_at)->not->toBeNull();
    expect($break->ended_at)->toBeNull();
});

it('does not allow to start break without active work session', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );
    
    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );

    $break = $workBreakService->startBreak($user);

    expect($break)->toBeFalse();
});

it('does not allow to start break when another one is active', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );
    
    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );
    $session = $workSessionService->startWork($user);

    $break = $workBreakService->startBreak($user);
    $secondBreak = $workBreakService->startBreak($user);

    expect($secondBreak)->toBeFalse();
    expect($break->ended_at)->toBeNull();
    expect($session->workBreaks()->count())->toBe(1);
});

it('allows to end active break', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );
    
    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );
    $session = $workSessionService->startWork($user);

    $break = $workBreakService->startBreak($user);
    $endedBreak = $workBreakService->endBreak($user);

    expect($endedBreak)->not->toBeFalse();
    expect($endedBreak->ended_at)->not->toBeNull();
    expect($endedBreak->work_session_id)->toBe($session->id);  
});

it('does not allow to end break when there is no active one', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );
    
    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );
    $session = $workSessionService->startWork($user);

    $endedBreak = $workBreakService->endBreak($user);

    expect($endedBreak)->toBeFalse();
});

it('returns active break for user', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );
    
    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );

    $session = $workSessionService->startWork($user);
    $break = $workBreakService->startBreak($user);

    $activeBreak = $workBreakQuery->getActiveBreak($session);

    expect($activeBreak->id)->toBe($break->id);
});

it('returns null when user has no active break', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );
    
    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );

    $session = $workSessionService->startWork($user);

    $activeBreak = $workBreakQuery->getActiveBreak($session);

    expect($activeBreak)->toBeNull();
});

it('does not allow to end work when user has an active break', function () {
    $user = User::factory()->create();
    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );
    
    $workBreakService = new WorkBreakService(
    $workSessionService,
        $workBreakQuery
    );

    $workSessionService->startWork($user);
    $workBreakService->startBreak($user);
    $result = $workSessionService->endWork($user);

    expect($result)->toBeFalse();
});

it('calculates today break minutes', function () {
    Carbon::setTestNow('2026-07-29 16:00:00');

    $user = User::factory()->create();

    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );

    $workBreakService = new WorkBreakService(
        $workSessionService,
        $workBreakQuery
    );

    $session = $user->workSessions()->create([
        'started_at' => '2026-07-29 08:00:00',
        'ended_at' => '2026-07-29 16:00:00',
    ]);

    $session->workBreaks()->create([
        'started_at' => '2026-07-29 12:00:00',
        'ended_at' => '2026-07-29 13:00:00',
    ]);

    expect($workBreakService->getTodayBreakMinutes($user))
        ->toBe(60);

    Carbon::setTestNow();
});

it('calculates active break minutes today', function () {
    Carbon::setTestNow('2026-07-29 13:00:00');

    $user = User::factory()->create();

    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );

    $workBreakService = new WorkBreakService(
        $workSessionService,
        $workBreakQuery
    );

    $session = $user->workSessions()->create([
        'started_at' => '2026-07-29 08:00:00',
    ]);

    $session->workBreaks()->create([
        'started_at' => '2026-07-29 12:00:00',
    ]);

    expect($workBreakService->getTodayBreakMinutes($user))
        ->toBe(60);

    Carbon::setTestNow();
});

it('calculates break minutes this week', function () {
    Carbon::setTestNow('2026-07-29 16:00:00');

    $user = User::factory()->create();

    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );

    $workBreakService = new WorkBreakService(
        $workSessionService,
        $workBreakQuery
    );

    $session = $user->workSessions()->create([
        'started_at' => '2026-07-28 08:00:00',
        'ended_at' => '2026-07-28 16:00:00',
    ]);

    $session->workBreaks()->create([
        'started_at' => '2026-07-28 10:00:00',
        'ended_at' => '2026-07-28 10:30:00',
    ]);

    $session->workBreaks()->create([
        'started_at' => '2026-07-28 13:00:00',
        'ended_at' => '2026-07-28 14:00:00',
    ]);

    expect($workBreakService->getThisWeekBreakMinutes($user))
        ->toBe(90);

    Carbon::setTestNow();
});

it('ignores breaks from previous weeks', function () {
    Carbon::setTestNow('2026-07-29 16:00:00');

    $user = User::factory()->create();

    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );

    $workBreakService = new WorkBreakService(
        $workSessionService,
        $workBreakQuery
    );

    $oldSession = $user->workSessions()->create([
        'started_at' => '2026-07-15 08:00:00',
        'ended_at' => '2026-07-15 16:00:00',
    ]);

    $oldSession->workBreaks()->create([
        'started_at' => '2026-07-15 12:00:00',
        'ended_at' => '2026-07-15 13:00:00',
    ]);

    $currentSession = $user->workSessions()->create([
        'started_at' => '2026-07-28 08:00:00',
        'ended_at' => '2026-07-28 16:00:00',
    ]);

    $currentSession->workBreaks()->create([
        'started_at' => '2026-07-28 12:00:00',
        'ended_at' => '2026-07-28 12:30:00',
    ]);

    expect($workBreakService->getThisWeekBreakMinutes($user))
        ->toBe(30);

    Carbon::setTestNow();
});

it('calculates break minutes this month', function () {
    Carbon::setTestNow('2026-07-29 16:00:00');

    $user = User::factory()->create();

    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );

    $workBreakService = new WorkBreakService(
        $workSessionService,
        $workBreakQuery
    );

    $session = $user->workSessions()->create([
        'started_at' => '2026-07-28 08:00:00',
        'ended_at' => '2026-07-28 16:00:00',
    ]);

    $session->workBreaks()->create([
        'started_at' => '2026-07-28 10:00:00',
        'ended_at' => '2026-07-28 10:30:00',
    ]);

    $session->workBreaks()->create([
        'started_at' => '2026-07-18 13:00:00',
        'ended_at' => '2026-07-18 14:00:00',
    ]);

    expect($workBreakService->getThisWeekBreakMinutes($user))
        ->toBe(90);

    Carbon::setTestNow();
});

it('ignores breaks from previous months', function () {
    Carbon::setTestNow('2026-07-29 16:00:00');

    $user = User::factory()->create();

    $workBreakQuery = new WorkBreakQuery();

    $workSessionService = new WorkSessionService(
        $workBreakQuery
    );

    $workBreakService = new WorkBreakService(
        $workSessionService,
        $workBreakQuery
    );

    $oldSession = $user->workSessions()->create([
        'started_at' => '2026-06-15 08:00:00',
        'ended_at' => '2026-06-15 16:00:00',
    ]);

    $oldSession->workBreaks()->create([
        'started_at' => '2026-06-15 12:00:00',
        'ended_at' => '2026-06-15 13:00:00',
    ]);

    $currentSession = $user->workSessions()->create([
        'started_at' => '2026-07-28 08:00:00',
        'ended_at' => '2026-07-28 16:00:00',
    ]);

    $currentSession->workBreaks()->create([
        'started_at' => '2026-07-28 12:00:00',
        'ended_at' => '2026-07-28 12:30:00',
    ]);

    expect($workBreakService->getThisWeekBreakMinutes($user))
        ->toBe(30);

    Carbon::setTestNow();
});