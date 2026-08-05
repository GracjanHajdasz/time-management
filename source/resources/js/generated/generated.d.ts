declare namespace App {
    namespace Data {
        export type AdminDashboardData = {
            employeesCount: number;
            activeSessions: number;
        };
        export type DashboardData = {
            activeSession: App.Data.WorkSessionData | null;
            activeBreak: App.Data.WorkBreakData | null;
            stats: App.Data.EmployeeStatsData;
            sessions: App.Data.PaginationData;
        };
        export type EmployeeData = {
            id: number;
            name: string;
            email: string;
        };
        export type EmployeeStatsData = {
            todayWorkMinutes: number;
            weekWorkMinutes: number;
            monthWorkMinutes: number;
            todayBreakMinutes: number;
            weekBreakMinutes: number;
            monthBreakMinutes: number;
        };
        export type PaginationData = {
            data: Array<any>;
            currentPage: number;
            lastPage: number;
            perPage: number;
            total: number;
        };
        export type WorkBreakData = {
            id: number;
            workSessionId: number;
            startedAt: string;
            endedAt: string | null;
        };
        export type WorkSessionData = {
            id: number;
            startedAt: string;
            endedAt: string | null;
        };
    }
}
