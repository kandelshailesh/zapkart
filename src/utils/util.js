export function getFormattedDate (dateJSON) {
  const date = new Date(dateJSON)
  const DD = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  const YYYY = date.getFullYear()

  return `${DD}-${MM}-${YYYY}`
}

export function getFormattedTime (dateJSON) {
  const date = new Date(dateJSON)
  const HH = (date.getHours() < 10 ? '0' : '') + date.getHours()
  const mm = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  const ss = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()

  return `${HH}:${mm}:${ss}`
}
