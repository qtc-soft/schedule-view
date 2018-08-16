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
  ADD_SCHEDULE (state, data) {
    Vue.set(state.schedules, data.id, data)
  },
  SAVE_SCHEDULE (state, data) {
    Vue.set(state.schedules, data.id, data)
  },
  REMOVE_SCHEDULE (state, id) {
    Vue.delete(state.schedules, id)
  },
  CALENDAR_MODE (state, value) {
    Vue.set(state, 'calendar_mode', value)
  }
}
