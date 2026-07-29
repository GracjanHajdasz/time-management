import { WorkStatsProps } from '@/types/props';
import formatMinutes from '@/functions/formatMinutes';

export default function WorkSessionStats({
    todayWorkMinutes,
    weekWorkMinutes,
    monthWorkMinutes,
}: WorkStatsProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Dzisiaj</p>
                <p className="text-2xl font-bold">
                    {formatMinutes(todayWorkMinutes)}
                </p>
            </div>

            <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Ten tydzień</p>
                <p className="text-2xl font-bold">
                    {formatMinutes(weekWorkMinutes)}
                </p>
            </div>

            <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Ten miesiąc</p>
                <p className="text-2xl font-bold">
                    {formatMinutes(monthWorkMinutes)}
                </p>
            </div>
        </div>
    );
}
