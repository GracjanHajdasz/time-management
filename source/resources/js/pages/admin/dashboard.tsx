import { Head, Link, router } from '@inertiajs/react';
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

                    <button onClick={() => router.post(generate())}>
                        Generuj raport pracowników
                    </button>
                </div>
            </div>
        </>
    );
}
