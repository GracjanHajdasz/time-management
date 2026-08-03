import { Head } from '@inertiajs/react';
import { EmployeesIndexProps } from '@/types/props';
import Pagination from '@/components/Pagination';

export default function Index({ employees }: EmployeesIndexProps) {
    return (
        <>
            <Head title="Employees" />

            <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Employees</h1>
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
