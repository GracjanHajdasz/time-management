import formatDate from '../functions/formatDate';
import calculateDuration from '../functions/calculateDuration';
import { WorkSessionHistoryProps } from '../types/props';
import { ChevronLeft, ChevronRight, History } from 'lucide-react';
import { router } from '@inertiajs/react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function WorkSessionHistory({
    userSessions,
}: WorkSessionHistoryProps) {
    const changePage = (page: number) => {
        router.get(
            window.location.pathname,
            {
                page,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <div className="flex max-h-[320px] flex-col overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card/70 shadow-sm backdrop-blur-sm dark:border-sidebar-border dark:bg-card/40">
            <div className="flex items-center gap-3 border-b border-sidebar-border/70 px-5 py-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-background/70 p-2.5">
                    <History className="h-4 w-4 text-foreground" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">
                        Historia sesji
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Ostatnie wpisy pracy
                    </p>
                </div>
                <div className="mt-2 ml-auto flex w-[280px] items-center justify-between gap-2">
                    <div className="flex flex-1 justify-start">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span>
                                    {userSessions.current_page == 1 ? (
                                        <button
                                            type="button"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/70 shadow-sm transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-border/60 dark:bg-background/40"
                                            disabled
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                changePage(
                                                    userSessions.current_page -
                                                        1,
                                                )
                                            }
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/80 shadow-sm transition-colors hover:border-border hover:bg-accent/70 hover:text-foreground dark:border-border/60 dark:bg-background/40 dark:hover:bg-accent/20"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                    )}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>Poprzednia strona</TooltipContent>
                        </Tooltip>
                    </div>

                    <span className="min-w-[6.5rem] text-center text-[10px] font-medium tracking-[0.2em] text-muted-foreground/80 uppercase">
                        Strona {userSessions.current_page} z{' '}
                        {userSessions.last_page}
                    </span>

                    <div className="flex flex-1 justify-end">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span>
                                    {userSessions.current_page ==
                                    userSessions.last_page ? (
                                        <button
                                            type="button"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/70 shadow-sm transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-border/60 dark:bg-background/40"
                                            disabled
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                changePage(
                                                    userSessions.current_page +
                                                        1,
                                                )
                                            }
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/80 shadow-sm transition-colors hover:border-border hover:bg-accent/70 hover:text-foreground dark:border-border/60 dark:bg-background/40 dark:hover:bg-accent/20"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    )}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>Następna strona</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {userSessions.data.length > 0 ? (
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                    <table className="min-w-full border-collapse text-left text-sm">
                        <thead className="bg-background/70 text-muted-foreground">
                            <tr>
                                <th className="px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase">
                                    nr.
                                </th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase">
                                    Data i godzina rozpoczęcia
                                </th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase">
                                    Data i godzina zakończenia
                                </th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase">
                                    Czas pracy
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/70">
                            {userSessions.data.map((session) => (
                                <tr
                                    key={session.id}
                                    className={`transition-colors ${!session.ended_at ? 'bg-emerald-500/10' : 'hover:bg-muted/50'}`}
                                >
                                    <td className="px-5 py-3 text-foreground/90">
                                        {session.id}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-foreground/85">
                                        {formatDate(session.started_at)}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-foreground/85">
                                        {!session.ended_at ? (
                                            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                Trwa
                                            </span>
                                        ) : (
                                            formatDate(session.ended_at)
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-foreground/90">
                                        {calculateDuration(
                                            session.started_at,
                                            session.ended_at,
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-1 items-center justify-center px-5 py-8 text-sm text-muted-foreground">
                    brak sesji pracy
                </div>
            )}
        </div>
    );
}
