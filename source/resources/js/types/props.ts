export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type PaginationProps<T> = {
    paginatedData: PaginatedData<T>;
};

export type Employee = {
    id: number;
    name: string;
    email: string;
};

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
    userSessions: PaginatedData<WorkSession>;
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
    userSessions: PaginatedData<WorkSession>;
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
        data: {
            id: number;
            name: string;
            email: string;
        }[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
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
        todayBreakMinutes: number;
        weekBreakMinutes: number;
        monthBreakMinutes: number;
    };
    employeeWorkSessions: PaginatedData<WorkSession>;
};
