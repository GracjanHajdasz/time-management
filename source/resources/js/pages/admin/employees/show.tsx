import { ShowEmployeesProps } from '@/types/props';
import { Head } from '@inertiajs/react';
import formatMinutes from '@/functions/formatMinutes';
import WorkSessionHistory from '@/components/WorkSessionHistory';

export default function Show({
    employee,
    employeeStats,
    employeeWorkSessions,
}: ShowEmployeesProps) {
    return (
        <>
            <Head title={employee.name} />

            <div className="p-6">
                <h1 className="text-2xl font-bold">{employee.name}</h1>

                <p className="text-muted-foreground">{employee.email}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">Today</p>

                        <p className="text-3xl font-bold">
                            {formatMinutes(employeeStats.todayWorkMinutes)}
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">
                            This week
                        </p>

                        <p className="text-3xl font-bold">
                            {formatMinutes(employeeStats.weekWorkMinutes)}
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">
                            This month
                        </p>

                        <p className="text-3xl font-bold">
                            {formatMinutes(employeeStats.monthWorkMinutes)}
                        </p>
                    </div>
                </div>
            </div>
            <WorkSessionHistory userSessions={employeeWorkSessions} />
        </>
    );
}
