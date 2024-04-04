export function getDateTime() {
  // day/month/year hour:minutes
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${day}/${month}/${year} ${hours}:${minutes}`
}