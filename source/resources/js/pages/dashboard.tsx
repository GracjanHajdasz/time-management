import { Head, router, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import formatDate from '../functions/formatDate';
import calculateDuration from '../functions/calculateDuration';

type Props = {
    activeSession: {
        id: number;
        started_at: string;
        ended_at: string | null;
    } | null;

    userSessions: {
        id: number;
        started_at: string;
        ended_at: string | null;
    }[];
};

export default function Dashboard({ activeSession, userSessions }: Props) {
    const { flash, errors } = usePage<any>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {activeSession ? (
                            <div>
                                <p>Pracujesz</p>
                                <p>Rozpoczęto: {activeSession.started_at}</p>

                                <button
                                    className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
                                    onClick={() =>
                                        router.post('/work-sessions/end')
                                    }
                                >
                                    Zakończ pracę
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p>Nie pracujesz</p>

                                <button
                                    onClick={() =>
                                        router.post('/work-sessions/start')
                                    }
                                    className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
                                >
                                    Rozpocznij pracę
                                </button>
                            </div>
                        )}
                        {flash.success && <div>{flash.success}</div>}
                        {errors.status && <div>{errors.status}</div>}
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {userSessions.length > 0 ? (
                            <table>
                                <tr>
                                    <th>nr.</th>
                                    <th>Data i godzina rozpoczęcia</th>
                                    <th>Data i godzina zakończenia</th>
                                </tr>
                                {userSessions.map((session) => (
                                    <tr key={session.id}>
                                        <td>{session.id}</td>
                                        <td>
                                            {formatDate(session.started_at)}
                                        </td>
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
                            </table>
                        ) : (
                            <div>brak sesji pracy</div>
                        )}
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
