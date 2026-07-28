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

    $workSessionService->startWork($user);
    $break = $workBreakService->startBreak($user);

    $activeBreak = $workBreakService->getActiveBreak($user);

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

    $workSessionService->startWork($user);

    $activeBreak = $workBreakService->getActiveBreak($user);

    expect($activeBreak)->toBeNull();
});