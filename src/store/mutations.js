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
  MENU_ITEM (state, data) {
    Vue.set(state, 'menu_item', data)
  },
  // init all schedules
  SCHEDULES (state, data) {
    Vue.set(state, 'schedules', data)
  },
  // update single schedule
  SCHEDULE (state, data) {
    Vue.set(state.schedules, data.id, data)
  },
  SCHEDULE_REMOVE (state, id) {
    Vue.delete(state.schedules, id)
  },
  SCHEDULE_DETAILS (state, data) {
    Vue.set(state, 'scheduleDetails', data)
  },
  SCHEDULE_DETAIL (state, data) {
    let schData
    if (data && 'schedule_id' in data) {
      schData = state.scheduleDetails[data.schedule_id]
      if (schData) {
        schData.details.push(data)
      } else {
        Vue.set(state.scheduleDetails, data.schedule_id, {details: [data], orders: []})
      }
    }
  },
  SCHEDULE_DETAILS_REMOVE (state, data) {
    let schData
    if (data && 'schedule_id' in data) {
      schData = state.scheduleDetails[data.schedule_id]
    }
    if (schData) {
      let newDetails = schData.details.filter(d => d.time !== data.detail.time)
      let newSchData = {...schData, details: newDetails}
      Vue.set(state.scheduleDetails, data.schedule_id, newSchData)
    }
  },
  CALENDAR_MODE (state, value) {
    Vue.set(state, 'calendar_mode', value)
  },
  CALENDAR_CURRENT_DAY (state, value) {
    Vue.set(state, 'calendar_current_day', value)
  }
}
