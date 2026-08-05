import formatDate from '../functions/formatDate';
import calculateDuration from '../functions/calculateDuration';
import { History } from 'lucide-react';
import Pagination from './Pagination';

type Props = {
    userSessions: Omit<App.Data.PaginationData, 'data'> & {
        data: App.Data.WorkSessionData[];
    };
};

export default function WorkSessionHistory({ userSessions }: Props) {
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
                <div className="mt-2 ml-auto w-full max-w-[280px]">
                    <Pagination paginatedData={userSessions} />
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
                                    className={`transition-colors ${!session.endedAt ? 'bg-emerald-500/10' : 'hover:bg-muted/50'}`}
                                >
                                    <td className="px-5 py-3 text-foreground/90">
                                        {session.id}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-foreground/85">
                                        {formatDate(session.startedAt)}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-foreground/85">
                                        {!session.endedAt ? (
                                            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                Trwa
                                            </span>
                                        ) : (
                                            formatDate(session.endedAt)
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-foreground/90">
                                        {calculateDuration(
                                            session.startedAt,
                                            session.endedAt,
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
