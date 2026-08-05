import formatMinutes from '@/functions/formatMinutes';
import { BarChart3, Coffee } from 'lucide-react';

type Props = {
    stats: App.Data.EmployeeStatsData;
};

export default function WorkSessionStats({ stats }: Props) {
    const workStats = [
        { label: 'Dzisiaj', value: formatMinutes(stats.todayWorkMinutes) },
        { label: 'Ten tydzień', value: formatMinutes(stats.weekWorkMinutes) },
        { label: 'Ten miesiąc', value: formatMinutes(stats.monthWorkMinutes) },
    ];

    const breakStats = [
        { label: 'Dzisiaj', value: formatMinutes(stats.todayBreakMinutes) },
        { label: 'Ten tydzień', value: formatMinutes(stats.weekBreakMinutes) },
        { label: 'Ten miesiąc', value: formatMinutes(stats.monthBreakMinutes) },
    ];

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-sidebar-border/70 bg-card/70 p-5 shadow-sm backdrop-blur-sm dark:border-sidebar-border dark:bg-card/40">
                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-background/70 p-2.5">
                        <BarChart3 className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight text-foreground">
                            Przepracowany czas
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Podsumowanie Twojego czasu pracy w różnych okresach.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {workStats.map((item) => (
                        <div
                            key={item.label}
                            className="flex min-h-[104px] flex-col justify-center rounded-xl border border-sidebar-border/70 bg-background/70 p-4 shadow-sm"
                        >
                            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                {item.label}
                            </p>
                            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-2xl border border-sidebar-border/70 bg-card/70 p-5 shadow-sm backdrop-blur-sm dark:border-sidebar-border dark:bg-card/40">
                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-background/70 p-2.5">
                        <Coffee className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight text-foreground">
                            Czas spędzony na przerwie
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Zestawienie czasu przerw w wybranych zakresach.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {breakStats.map((item) => (
                        <div
                            key={item.label}
                            className="flex min-h-[104px] flex-col justify-center rounded-xl border border-sidebar-border/70 bg-background/70 p-4 shadow-sm"
                        >
                            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                {item.label}
                            </p>
                            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
