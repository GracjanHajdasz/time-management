export default function formatMinutes(minutes: number) {
    if (!minutes || minutes == 0) return '0h 0m';
    const hours: number = Math.floor(minutes / 60);
    const workMinutes: number = minutes % 60;
    return `${hours}h ${workMinutes}m`;
}
