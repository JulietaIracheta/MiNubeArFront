let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Reunión de Padres',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Evaluación de Lengua',
    start: '20210618' + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

export function removeEventId() {
  return String(0)
}
