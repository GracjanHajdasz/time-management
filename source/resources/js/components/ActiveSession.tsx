import { router, usePage } from '@inertiajs/react';
import { ActiveSessionProps } from '@/types/props';

export default function ActiveSession({
    activeSession,
    activeBreak,
}: ActiveSessionProps) {
    const { flash, errors } = usePage<any>().props;

    return (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            {activeSession ? (
                <>
                    <div>
                        <p>Pracujesz</p>
                        <p>Rozpoczęto: {activeSession.started_at}</p>

                        <button
                            className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
                            onClick={() => router.post('/work-sessions/end')}
                        >
                            Zakończ pracę
                        </button>
                    </div>

                    {activeBreak ? (
                        <div>
                            <p>Jesteś na przerwie od {activeBreak.started_at}</p>
                            <button
                                onClick={() => router.post('/work-breaks/end')}
                                className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
                            >
                                Zakończ przerwę
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={() => router.post('/work-breaks/start')}
                                className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
                            >
                                Rozpocznij przerwę
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <p>Nie pracujesz</p>

                    <button
                        onClick={() => router.post('/work-sessions/start')}
                        className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
                    >
                        Rozpocznij pracę
                    </button>
                </div>
            )}
            
            {flash.success && <div>{flash.success}</div>}
            {errors.status && <div>{errors.status}</div>}
        </div>
    );
}
