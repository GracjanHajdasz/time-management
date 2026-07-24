import formatDate from '../functions/formatDate';
import calculateDuration from '../functions/calculateDuration';
import { WorkSessionHistoryProps } from '../types/props';

export default function WorkSessionHistory({
    userSessions,
}: WorkSessionHistoryProps) {
    return (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            {userSessions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>nr.</th>
                            <th>Data i godzina rozpoczęcia</th>
                            <th>Data i godzina zakończenia</th>
                            <th>Czas pracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userSessions.map((session) => (
                            <tr key={session.id}>
                                <td>{session.id}</td>
                                <td>{formatDate(session.started_at)}</td>
                                <td>
                                    {!session.ended_at ? (
                                        <span>Trwa</span>
                                    ) : (
                                        formatDate(session.ended_at)
                                    )}
                                </td>
                                <td>
                                    {calculateDuration(
                                        session.started_at,
                                        session.ended_at,
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>brak sesji pracy</div>
            )}
        </div>
    );
}
