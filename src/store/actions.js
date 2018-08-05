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
  }
}
