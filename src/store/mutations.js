import Vue from 'vue'

export default {
  //
  LOGIN (state, data) {
    Vue.set(state, 'authenticatedData', data)
  },
  SOCIAL (state, data) {
    if (data.type && data.token) {
      Vue.set(state, data.type, data.token)
    }
  },
  SCHEDULE_ADD (state, data) {
    Vue.set(state.schedules, data.id, data)
  },
  SCHEDULE_DETAILS_ADD (state, data) {
    let schData
    if (data && 'schedule_id' in data) {
      schData = state.scheduleDetails[data.schedule_id]
    }
    if (schData && data.detail) {
      // find time with equal time value
      let foundedTimeIndex
      let foundedTimeData
      schData.some((d, i) => {
        let res = d.time === data.detail.time
        if (res) {
          foundedTimeIndex = i
          foundedTimeData = d
        }
        return res
      })
      // if detail already exists incriment clients counter
      if (foundedTimeData) {
        foundedTimeData.clients++
        Vue.set(state.scheduleDetails, foundedTimeIndex, foundedTimeData)
      // if not founded add new schedule detail
      } else {
        schData.push(data.detail)
      }
    }
  },
  SCHEDULE_DETAILS_REMOVE (state, data) {
    let schData
    if (data && 'schedule_id' in data) {
      schData = state.scheduleDetails[data.schedule_id]
    }
    if (schData && data.detail) {
      let newDetails = schData.filter(d => d.time !== data.detail.time)
      Vue.set(state.scheduleDetails, data.schedule_id, newDetails)
    }
  },
  SAVE_SCHEDULE (state, data) {
    Vue.set(state.schedules, data.id, data)
  },
  REMOVE_SCHEDULE (state, id) {
    Vue.delete(state.schedules, id)
  },
  CALENDAR_MODE (state, value) {
    Vue.set(state, 'calendar_mode', value)
  },
  CALENDAR_CURRENT_DAY (state, value) {
    Vue.set(state, 'calendar_current_day', value)
  }
}
