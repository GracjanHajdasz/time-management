import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import ActiveSession from '../components/ActiveSession';
import WorkSessionHistory from '@/components/WorkSessionHistory';
import WorkStats from '../components/WorkStats';

type Props = {
    dashboard: App.Data.DashboardData;
};

export default function Dashboard({ dashboard }: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <div className="grid auto-rows-min gap-6 md:grid-cols-2">
                    <ActiveSession
                        activeSession={dashboard.activeSession}
                        activeBreak={dashboard.activeBreak}
                    />
                    <WorkSessionHistory userSessions={dashboard.sessions} />
                </div>

                <WorkStats stats={dashboard.stats} />
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
