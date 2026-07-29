import formatDate from '../functions/formatDate';
import calculateDuration from '../functions/calculateDuration';
import { WorkSessionHistoryProps } from '../types/props';

export default function WorkSessionHistory({
    userSessions,
}: WorkSessionHistoryProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card/70 shadow-sm backdrop-blur-sm dark:border-sidebar-border dark:bg-card/40">
            {userSessions.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-left text-sm text-foreground/80">
                        <thead className="bg-muted/40 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">nr.</th>
                                <th className="px-4 py-3 font-medium">
                                    Data i godzina rozpoczęcia
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Data i godzina zakończenia
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Czas pracy
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/70">
                            {userSessions.map((session) => (
                                <tr
                                    key={session.id}
                                    className="transition-colors hover:bg-muted/50"
                                >
                                    <td className="px-4 py-3 text-foreground/90">
                                        {session.id}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-foreground/85">
                                        {formatDate(session.started_at)}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-foreground/85">
                                        {!session.ended_at ? (
                                            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                                Trwa
                                            </span>
                                        ) : (
                                            formatDate(session.ended_at)
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-foreground/90">
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
                <div className="px-4 py-6 text-sm text-muted-foreground">
                    brak sesji pracy
                </div>
            )}
        </div>
    );
}
