export default function Time({ timeString, timeZone = 'Europe/Berlin' }) {
  const d = new Date(timeString)
  return Intl.DateTimeFormat('default', { timeZone }).format(d)
}

export function LocalTime(timeString, timeZone = 'Europe/Berlin') {
  const d = new Date(timeString)
  return Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone,
    timeZoneName: 'short',
  }).format(d)
}

export function LocalDate(timeString) {
  const d = new Date(timeString)
  return Intl.DateTimeFormat('default', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}
