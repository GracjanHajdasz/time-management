import { ShowEmployeesProps } from '@/types/props';
import { Head } from '@inertiajs/react';
import formatMinutes from '@/functions/formatMinutes';
import WorkSessionHistory from '@/components/WorkSessionHistory';
import WorkSessionStats from '@/components/WorkStats';

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

                <WorkSessionStats {...employeeStats} />
            </div>
            <WorkSessionHistory userSessions={employeeWorkSessions} />
        </>
    );
}
