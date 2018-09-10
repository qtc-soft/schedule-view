/*
export const someGetter = (state) => {
}
*/
// import { date } from 'quasar'

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
  getItemByName: (state) => (itemsType, name) => {
    let items = state[itemsType]
    let item
    if (items) {
      for (let id in items) {
        if (items[id].name === name) {
          item = items[id]
          break
        }
      }
    }
    return item
  },
  // get schedule details from storage
  getScheduleDetail: (state) => (scheduleId, timeInSec) => {
    // result variable
    let result = null
    // schedule data variable
    let schData
    // if schedule data already exists
    if (scheduleId) {
      schData = state.scheduleDetails ? state.scheduleDetails[scheduleId] : null
      if (schData && schData.details) {
        // find time with equal time value
        let foundedTimeData
        schData.details.some((d, i) => {
          let res = d.time === timeInSec
          if (res) {
            foundedTimeData = d
          }
          return res
        })
        result = foundedTimeData
      }
    }
    return result
  }
}
