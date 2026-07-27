import { WorkSessionStatsProps } from '@/types/props';

export default function WorkSessionStats({
    todayWorkMinutes,
}: WorkSessionStatsProps) {
    return (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <p>Dzisiaj: {todayWorkMinutes}</p>
        </div>
    );
}
