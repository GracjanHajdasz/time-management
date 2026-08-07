import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, BriefcaseBusiness, Edit, Mail } from 'lucide-react';
import { index } from '@/actions/App/Http/Controllers/EmployeeController';
import { update } from '@/actions/App/Http/Controllers/EmployeeController';
import WorkSessionHistory from '@/components/WorkSessionHistory';
import WorkSessionStats from '@/components/WorkStats';

type Props = {
    employee: App.Data.EmployeeData;
    employeeStats: App.Data.EmployeeStatsData;
    employeeWorkSessions: Omit<App.Data.PaginationData, 'data'> & {
        data: App.Data.WorkSessionData[];
    };
};

export default function Show({
    employee,
    employeeStats,
    employeeWorkSessions,
}: Props) {
    const [isEditing, setIsEditing] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        const params = new URLSearchParams(window.location.search);
        return params.get('edit') === '1';
    });

    const [form, setForm] = useState({
        name: employee.name,
        email: employee.email,
    });

    const submit = () => {
        router.put(update(employee.id), form, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

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
                            <button
                                type="button"
                                onClick={() => setIsEditing(!isEditing)}
                                className="inline-flex items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background"
                            >
                                <Edit className="h-4 w-4" />
                                {isEditing ? 'Anuluj' : 'Edytuj'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2.5 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{employee.email}</span>
                    </div>
                    {isEditing && (
                        <section className="mt-5 rounded-2xl border border-sidebar-border/70 bg-card/70 p-5 shadow-sm">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Imię
                                    </label>

                                    <input
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Wprowadź imię pracownika"
                                        className="w-full rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2.5 text-sm text-foreground shadow-sm transition outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Email
                                    </label>

                                    <input
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Wprowadź adres email"
                                        className="w-full rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2.5 text-sm text-foreground shadow-sm transition outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={submit}
                                        className="inline-flex items-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
                                    >
                                        Zapisz zmiany
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="inline-flex items-center rounded-xl border border-sidebar-border/70 bg-background/70 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-background"
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </section>

                <WorkSessionStats stats={employeeStats} />
                <WorkSessionHistory userSessions={employeeWorkSessions} />
            </div>
        </>
    );
}
