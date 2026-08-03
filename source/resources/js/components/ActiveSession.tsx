import { router, usePage } from '@inertiajs/react';
import { ActiveSessionProps } from '@/types/props';
import calculateDuration from '@/functions/calculateDuration';
import { useState, useEffect } from 'react';
import { Clock3, Coffee, Play, Square } from 'lucide-react';
import {
    end as endWorkSession,
    start as startWorkSession,
} from '@/actions/App/Http/Controllers/WorkSessionController';
import {
    end as endWorkBreak,
    start as startWorkBreak,
} from '@/actions/App/Http/Controllers/WorkBreakController';

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

    const statusLabel = activeBreak
        ? 'Na przerwie'
        : activeSession
          ? 'Pracujesz'
          : 'Nieaktywny';

    const statusClasses = activeBreak
        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
        : activeSession
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
          : 'bg-muted text-muted-foreground';

    return (
        <div className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-sm dark:border-sidebar-border dark:bg-card/40">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-background/70 p-2.5">
                        <Clock3 className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Aktywna sesja
                        </p>
                        <h2 className="text-lg font-semibold text-foreground">
                            Aktywność pracy
                        </h2>
                    </div>
                </div>

                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses}`}
                >
                    {statusLabel}
                </span>
            </div>

            {activeSession ? (
                <div className="flex flex-1 flex-col gap-5 pt-4">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                            Czas pracy
                        </p>
                        <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            {calculateDuration(activeSession.started_at, now)}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            onClick={() => router.post(endWorkSession())}
                        >
                            <Square className="h-4 w-4" />
                            Zakończ pracę
                        </button>

                        {activeBreak ? (
                            <button
                                onClick={() => router.post(endWorkBreak())}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                <Coffee className="h-4 w-4" />
                                Zakończ przerwę
                            </button>
                        ) : (
                            <button
                                onClick={() => router.post(startWorkBreak())}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                <Coffee className="h-4 w-4" />
                                Rozpocznij przerwę
                            </button>
                        )}
                    </div>

                    {activeBreak ? (
                        <div className="rounded-xl border border-sidebar-border/70 bg-background/70 p-4">
                            <div className="flex items-center gap-2">
                                <Coffee className="h-4 w-4 text-amber-600" />
                                <p className="text-sm font-medium text-muted-foreground">
                                    Przerwa trwa
                                </p>
                            </div>
                            <p className="mt-2 text-xl font-semibold text-foreground">
                                {calculateDuration(activeBreak.started_at, now)}
                            </p>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-6 pt-6 text-center">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                            Status
                        </p>
                        <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Nie pracujesz
                        </p>
                        <p className="mx-auto max-w-md text-base text-muted-foreground">
                            Rozpocznij nową sesję pracy, aby rozpocząć śledzenie
                            czasu.
                        </p>
                    </div>

                    <button
                        onClick={() => router.post(startWorkSession())}
                        className="inline-flex items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/80 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                        <Play className="h-4 w-4" />
                        Rozpocznij pracę
                    </button>
                </div>
            )}

            {flash.success && (
                <div className="mt-4 rounded-xl border border-sidebar-border/70 bg-background/80 px-3 py-2 text-sm text-muted-foreground">
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
