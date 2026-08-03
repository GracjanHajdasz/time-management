import { ShowEmployeesProps } from '@/types/props';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { index } from '@/actions/App/Http/Controllers/EmployeeController';
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
                <Link
                    href={index()}
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Wróć do pracowników
                </Link>

                <h1 className="text-2xl font-bold">{employee.name}</h1>

                <p className="text-muted-foreground">{employee.email}</p>

                <WorkSessionStats {...employeeStats} />
            </div>
            <WorkSessionHistory userSessions={employeeWorkSessions} />
        </>
    );
}
