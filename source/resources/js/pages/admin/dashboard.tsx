import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, FileText } from 'lucide-react';
import { index } from '@/actions/App/Http/Controllers/EmployeeController';
import { generate } from '@/actions/App/Http/Controllers/AdminReportController';

type Props = {
    stats: App.Data.AdminDashboardData;
};

export default function Dashboard({ stats }: Props) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Link className="rounded-lg border p-6" href={index()}>
                        <p className="text-sm text-muted-foreground">
                            Employees
                        </p>

                        <p className="text-3xl font-bold">
                            {stats.employeesCount}
                        </p>
                    </Link>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">
                            Active sessions
                        </p>

                        <p className="text-3xl font-bold">
                            {stats.activeSessions}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.post(generate())}
                        className="flex items-center justify-between rounded-2xl border border-sidebar-border/70 bg-card/70 p-6 text-left shadow-sm transition hover:bg-background"
                    >
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Report generation
                            </p>
                            <p className="mt-2 text-xl font-semibold text-foreground">
                                Generuj raport pracowników
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sidebar-border/70 bg-background/70 text-primary">
                            <FileText className="h-5 w-5" />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
