import { Head } from '@inertiajs/react';
import { EmployeesIndexProps } from '@/types/props';

export default function Index({ employees }: EmployeesIndexProps) {
    return (
        <>
            <Head title="Employees" />

            <div className="p-6">
                <h1 className="text-2xl font-bold">Employees</h1>

                <div className="mt-6 space-y-3">
                    {employees.map((employee) => (
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
