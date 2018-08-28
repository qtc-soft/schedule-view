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
      menuItem: null,
      TODAY: new Date(),
      weekDaysFullNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekDaysShortNames: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
        1: {
          id: 1,
          name: 'Schedule 1',
          description: 'some schedule description',
          email: '',
          phone: '',
          country_id: 1,
          city_id: 1,
          address: '',
          flags: null,
          data: null
        },
        2: {
          id: 2,
          name: 'Schedule 2'
        }
      },
      scheduleDetails: {
        1: [{
          id: 0,
          time: Date.now() + 1000 * 60 * 60 * 24, // next day
          description: '',
          members: 1
        }, {
          id: 1,
          time: Date.now() + 1000 * 60 * 60 * 24 * 3, // 3 days after today
          description: '',
          members: 1
        }],
        2: [{
          id: 1,
          time: Date.now() + 1000 * 60 * 60 * 24 * 2, // 2 days after today
          description: '',
          members: 1
        }]
      },
      calendar_mode: 'tab-month',
      calendar_current_day: null,
      //
      social: {}
    },
    actions,
    mutations,
    getters
  }
)

export default store
