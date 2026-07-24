export type WorkSession = {
    id: number;
    started_at: string;
    ended_at: string | null;
};

export type DashboardProps = {
    activeSession: WorkSession | null;
    userSessions: WorkSession[];
};

export type ActiveSessionProps = {
    activeSession: WorkSession | null;
};

export type WorkSessionHistoryProps = {
    userSessions: WorkSession[];
};
