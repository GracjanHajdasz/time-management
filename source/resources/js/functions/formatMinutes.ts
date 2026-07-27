export default function formatMinutes(minutes: number) {
    const hours: number = Math.floor(minutes / 60);
    const workMinutes: number = minutes % 60;
    return `${hours}h ${workMinutes}m`;
}
