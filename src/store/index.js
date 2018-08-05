import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
// import { LocalStorage } from 'quasar'

Vue.use(Vuex)
//
// let appSettings = LocalStorage.get.item('MB User Settings') || {}

const store = new Vuex.Store(
  {
    state: {
      // authorization data
      authenticatedData: {
        id: 1,
        sid: 'asdasdasd',
        name: 'Account name',
        description: 'some account description',
        organization: 'Organization',
        login: 'user',
        password: '123',
        email: 'ttt@mail.ru',
        mail_agreement: true,
        phone: '8-029-2222222',
        address: 'Lukyanoav str, 90-22',
        country_id: '1',
        city_id: '1'
      },
      //
      appSettings: {},
      //
      schedules: {
        0: {
          id: 0,
          name: 'Schedule 1',
          description: 'some schedule description'
        },
        1: {
          id: 1,
          name: 'Schedule 2'
        }
      },
      //
      social: {}
    },
    actions,
    mutations,
    getters
  }
)

export default store
