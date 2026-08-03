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
    todayBreakMinutes: number;
    weekBreakMinutes: number;
    monthBreakMinutes: number;
};

export type ActiveSessionProps = {
    activeSession: WorkSession | null;
    activeBreak: BreakSession | null;
};

export type WorkSessionHistoryProps = {
    userSessions: WorkSession[];
};

export type WorkStatsProps = {
    todayWorkMinutes: number;
    weekWorkMinutes: number;
    monthWorkMinutes: number;
    todayBreakMinutes: number;
    weekBreakMinutes: number;
    monthBreakMinutes: number;
};

//ADMIN DASHBOARD
export type AdminDashboardProps = {
    stats: {
        employeesCount: number;
        activeSessions: number;
    };
};

export type EmployeesIndexProps = {
    employees: {
        id: number;
        name: string;
        email: string;
    }[];
};

export type ShowEmployeesProps = {
    employee: {
        id: number;
        name: string;
        email: string;
    };
    employeeStats: {
        todayWorkMinutes: number;
        weekWorkMinutes: number;
        monthWorkMinutes: number;
    };
};
