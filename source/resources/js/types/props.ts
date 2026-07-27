export type WorkSession = {
    id: number;
    started_at: string;
    ended_at: string | null;
};

export type BreakSession = {
    id: number;
    work_session_id: number;
    started_at: string;
    ended_at: string | null;
};

export type DashboardProps = {
    activeSession: WorkSession | null;
    userSessions: WorkSession[];
    todayWorkMinutes: number;
    weekWorkMinutes: number;
    monthWorkMinutes: number;
    activeBreak: BreakSession | null;
};

export type ActiveSessionProps = {
    activeSession: WorkSession | null;
    activeBreak: BreakSession | null;
};

export type WorkSessionHistoryProps = {
    userSessions: WorkSession[];
};

export type WorkSessionStatsProps = {
    todayWorkMinutes: number;
    weekWorkMinutes: number;
    monthWorkMinutes: number;
};
