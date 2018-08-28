/*
export const someGetter = (state) => {
}
*/
import { date } from 'quasar'

export default {
  isAuthenticated (state, getters) {
    return (state.authenticatedData && state.authenticatedData.sid !== undefined)
  },
  getAuthData: (state) => (key, defaultValue) => {
    if (!key) {
      return state.authenticatedData
    } else if (state.authenticatedData && state.authenticatedData.hasOwnProperty(key)) {
      return state.authenticatedData[key]
    } else if (defaultValue) {
      return defaultValue
    }
    return state.authenticatedData || null
  },
  // return all day times for schedule
  dayTimeItems: (state) => (scheduleId, fullTime) => {
    let details = state.scheduleDetails[scheduleId]
    if (!details) {
      return []
    }
    // start of day with time 'fullTime'
    let dayStart = date.startOfDate(fullTime, 'day')
    // end of day with time 'fullTime'
    let dayEnd = date.endOfDate(fullTime, 'day')
    return details.filter(d => {
      // filter all schedule times with getting interval
      return fullTime && date.isBetweenDates(d.time, dayStart, dayEnd)
    })
  }
}
