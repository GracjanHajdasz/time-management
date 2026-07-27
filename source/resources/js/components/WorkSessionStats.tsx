import { WorkSessionStatsProps } from '@/types/props';
import formatMinutes from '@/functions/formatMinutes';

export default function WorkSessionStats({
    todayWorkMinutes,
    weekWorkMinutes,
    monthWorkMinutes,
}: WorkSessionStatsProps) {
    return (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <p>Dzisiaj: {formatMinutes(todayWorkMinutes)}</p>
            <p>W tym tygodniu: {formatMinutes(weekWorkMinutes)}</p>
            <p>W tym miesiącu: {formatMinutes(monthWorkMinutes)}</p>
        </div>
    );
}
