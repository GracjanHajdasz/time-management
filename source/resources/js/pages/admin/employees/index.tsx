import { Head, Link } from '@inertiajs/react';
import Pagination from '@/components/Pagination';
import { show } from '@/actions/App/Http/Controllers/EmployeeController';
import { index as dashboardIndex } from '@/actions/App/Http/Controllers/AdminDashboardController';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
                            className="rounded-lg border p-4"
                        >
                            <p className="font-medium">{employee.name}</p>

                            <p className="text-sm text-muted-foreground">
                                {employee.email}
                            </p>

                            <Link
                                href={show(employee.id)}
                                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                            >
                                Zobacz szczegóły
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
