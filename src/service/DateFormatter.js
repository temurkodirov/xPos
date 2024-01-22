export default function dateFormatter(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString();
}