import { Cookies } from 'quasar'
import Vue from 'vue'

export default {
  //
  login ({commit, state}, data) {
    // set authData in Cookies
    if (!Cookies.has('sch-authData')) {
      Cookies.set('sch-authData', JSON.stringify(data), {expire: 3})
    }
    // set authData in state
    commit('LOGIN', data)
    // set http-header
    Vue.dbAPI.setHeader('X-AccessToken', data.sid)
  },
  // logout
  logout ({commit, state}) {
    // delete from state
    commit('LOGIN', null)
    // delete cookies
    Cookies.remove('sch-authData')
    // delete header
    Vue.dbAPI.delHeader('X-AccessToken')
  },
  social ({commit, state}, data) {
    commit('SOCIAL', data)
  },
  async getSchedules ({commit, state}, errMsg) {
    if (!state.schedules) {
      // request
      let respData = await Vue.dbAPI.getSchedules({}, errMsg)
      // if result
      if (respData.result && respData.result.length) {
        // object schedules
        let schedules = {}
        for (let i in respData.result) {
          schedules[respData.result[i].id] = respData.result[i]
        }
        // save scheduless
        commit('SCHEDULES', schedules)
      }
    }
    return state.schedules
  },
  async getScheduleDetails ({commit, state}, errMsg) {
    if (!state.scheduleDetails) {
      // request
      let respData = await Vue.dbAPI.getScheduleDetails({}, errMsg)
      // if result
      if (respData.result && respData.result.length) {
        // save schedule details
        commit('SCHEDULE_DETAILS', respData.result[0])
      }
    }
    return state.scheduleDetails
  }
}
