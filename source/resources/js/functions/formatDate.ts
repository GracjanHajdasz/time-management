export default function formatDate(date: string | Date) {
    return new Date(date).toLocaleString('pl-PL');
}
