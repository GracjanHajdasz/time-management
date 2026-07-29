import { router, usePage } from '@inertiajs/react';
import { ActiveSessionProps } from '@/types/props';
import calculateDuration from '@/functions/calculateDuration';
import { useState, useEffect } from 'react';

export default function ActiveSession({
    activeSession,
    activeBreak,
}: ActiveSessionProps) {
    const { flash, errors } = usePage<any>().props;

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex min-h-[280px] flex-col justify-between overflow-hidden rounded-xl border border-sidebar-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-sm dark:border-sidebar-border dark:bg-card/40">
            {activeSession ? (
                <div className="flex flex-1 flex-col gap-5">
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">
                            Pracujesz przez{' '}
                            {calculateDuration(activeSession.started_at, now)}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-3">
                            <button
                                className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                onClick={() =>
                                    router.post('/work-sessions/end')
                                }
                            >
                                Zakończ pracę
                            </button>

                            {activeBreak ? (
                                <button
                                    onClick={() =>
                                        router.post('/work-breaks/end')
                                    }
                                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    Zakończ przerwę
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        router.post('/work-breaks/start')
                                    }
                                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    Rozpocznij przerwę
                                </button>
                            )}
                        </div>

                        {activeBreak ? (
                            <div className="rounded-lg border border-border bg-muted/40 p-3">
                                <p className="text-sm text-muted-foreground">
                                    Jesteś na przerwie od{' '}
                                    {calculateDuration(
                                        activeBreak.started_at,
                                        now,
                                    )}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-start justify-center gap-4">
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">
                            Nie pracujesz
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Rozpocznij nową sesję pracy.
                        </p>
                    </div>

                    <button
                        onClick={() => router.post('/work-sessions/start')}
                        className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                        Rozpocznij pracę
                    </button>
                </div>
            )}

            {flash.success && (
                <div className="mt-4 rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                    {flash.success}
                </div>
            )}
            {errors.status && (
                <div className="mt-2 text-sm text-destructive">
                    {errors.status}
                </div>
            )}
        </div>
    );
}
