import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { DashboardProps } from '../types/props';
import ActiveSession from '../components/ActiveSession';
import WorkSessionHistory from '@/components/WorkSessionHistory';
import WorkStats from '../components/WorkStats';

export default function Dashboard({
    activeSession,
    userSessions,
    todayWorkMinutes,
    weekWorkMinutes,
    monthWorkMinutes,
    activeBreak,
    todayBreakMinutes,
    weekBreakMinutes,
    monthBreakMinutes,
}: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <div className="grid auto-rows-min gap-6 md:grid-cols-2">
                    <ActiveSession
                        activeSession={activeSession}
                        activeBreak={activeBreak}
                    />
                    <WorkSessionHistory userSessions={userSessions} />
                </div>

                <WorkStats
                    todayWorkMinutes={todayWorkMinutes}
                    weekWorkMinutes={weekWorkMinutes}
                    monthWorkMinutes={monthWorkMinutes}
                    todayBreakMinutes={todayBreakMinutes}
                    weekBreakMinutes={weekBreakMinutes}
                    monthBreakMinutes={monthBreakMinutes}
                />
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
