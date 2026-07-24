export default function calculateDuration(
    startedAt: string,
    endedAt: string | null,
) {
    if (!endedAt) {
        return 'Sesja trwa';
    }

    const start = new Date(startedAt);
    const end = new Date(endedAt);

    const duration = end.getTime() - start.getTime();

    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}min`;
}
