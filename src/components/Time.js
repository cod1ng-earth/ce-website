export default function Time({ timeString, timeZone = 'Europe/Berlin' }) {
  const d = new Date(timeString)
  return Intl.DateTimeFormat('default', { timeZone }).format(d)
}
