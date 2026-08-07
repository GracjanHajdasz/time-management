import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/Pagination';
import { show } from '@/actions/App/Http/Controllers/EmployeeController';
import { index as dashboardIndex } from '@/actions/App/Http/Controllers/AdminDashboardController';
import { destroy } from '@/actions/App/Http/Controllers/EmployeeController';
import { ArrowLeft, ArrowRight, Edit, Trash2 } from 'lucide-react';

type Props = {
    employees: Omit<App.Data.PaginationData, 'data'> & {
        data: App.Data.EmployeeData[];
    };
};

export default function Index({ employees }: Props) {
    return (
        <>
            <Head title="Employees" />

            <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <Link
                            href={dashboardIndex()}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Powrót do dashboardu
                        </Link>
                        <h1 className="text-2xl font-bold">Employees</h1>
                    </div>
                    <Pagination paginatedData={employees} />
                </div>
                <div className="mt-6 space-y-3">
                    {employees.data.map((employee) => (
                        <div
                            key={employee.id}
                            className="rounded-2xl border border-sidebar-border/70 bg-card/70 p-5 shadow-sm transition-colors"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="font-semibold text-foreground">
                                        {employee.name}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {employee.email}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <Link
                                        href={show(employee.id)}
                                        className="inline-flex items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-background"
                                    >
                                        Zobacz szczegóły
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>

                                    <Link
                                        href={
                                            show(employee.id, {
                                                query: { edit: 1 },
                                            }).url
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-background"
                                    >
                                        <Edit className="h-4 w-4" />
                                        Edytuj
                                    </Link>

                                    <button
                                        type="button"
                                        aria-label={`Usuń pracownika ${employee.name}`}
                                        onClick={() =>
                                            router.delete(destroy(employee.id))
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Usuń
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
