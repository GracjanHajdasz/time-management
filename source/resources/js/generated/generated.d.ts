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
            sessions: any;
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
        export type WorkBreakData = {
            id: number;
            workSessionId: number;
            startedAt: undefined;
            endedAt: undefined | null;
        };
        export type WorkSessionData = {
            id: number;
            startedAt: undefined;
            endedAt: undefined | null;
        };
    }
}
