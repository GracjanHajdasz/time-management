import { ShowEmployeesProps } from '@/types/props';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BriefcaseBusiness, Mail } from 'lucide-react';
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

            <div className="space-y-6 p-6">
                <Link
                    href={index()}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Wróć do pracowników
                </Link>

                <section className="rounded-2xl border border-sidebar-border/70 bg-card/70 p-5 shadow-sm backdrop-blur-sm dark:border-sidebar-border dark:bg-card/40">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl border border-sidebar-border/70 bg-background/70 p-2.5">
                                <BriefcaseBusiness className="h-4 w-4 text-foreground" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                                    {employee.name}
                                </h1>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Szczegóły pracownika i jego aktywności
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2.5 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{employee.email}</span>
                    </div>
                </section>

                <WorkSessionStats {...employeeStats} />
                <WorkSessionHistory userSessions={employeeWorkSessions} />
            </div>
        </>
    );
}
