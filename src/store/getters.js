/*
export const someGetter = (state) => {
}
*/
import { date } from 'quasar'

export default {
  getAuthData: (state) => {
    return (state.authenticatedData && state.authenticatedData.sid) || null
  },
  dayTimeItems: (state) => (scheduleId, fullTime) => {
    debugger
    let details = state.scheduleDetails[scheduleId]
    if (!details) {
      return []
    }
    debugger
    return details.filter(d => {
      // filter all schedule times with getting interval
      return fullTime && date.isBetweenDates(d.time, date.startOfDate(fullTime, 'day'), date.endOfDate(fullTime, 'day'))
    })
  }
}
