<?php

namespace App\Services;

use App\Data\DashboardData;
use App\Data\WorkSessionData;
use App\Data\WorkBreakData;
use App\Data\PaginationData;
use App\Models\User;
use App\Queries\WorkBreakQuery;

class DashboardService
{
    public function __construct(
        protected WorkSessionService $workSessionService,
        protected WorkBreakQuery $workBreakQuery,
        protected EmployeeService $employeeService,
    ) {}

    public function getDashboard(User $user): DashboardData
    {
        $activeSession = $this->workSessionService
            ->getActiveSession($user);

        $activeBreak = null;

        if ($activeSession) {
            $activeBreak = $this->workBreakQuery
                ->getActiveBreak($activeSession);
        }

        $sessions = $this->workSessionService
            ->getUserSessions($user);

        $sessions->through(
            fn ($session) => WorkSessionData::from($session)
        );

        return new DashboardData(
            activeSession: $activeSession
                ? WorkSessionData::from($activeSession)
                : null,

            activeBreak: $activeBreak
                ? WorkBreakData::from($activeBreak)
                : null,

            stats: $this->employeeService
                ->getEmployeeStats($user),

            sessions: new PaginationData(
            data: $sessions->items(),
            currentPage: $sessions->currentPage(),
            lastPage: $sessions->lastPage(),
            perPage: $sessions->perPage(),
            total: $sessions->total(),
            ),
        );
    }
}