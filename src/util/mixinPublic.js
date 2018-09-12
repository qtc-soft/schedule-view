import { Notify, Cookies, date } from 'quasar'

// global params/constants
export default {
  data () {
    return {
      TIME_ZONE_OFFSET: -(new Date()).getTimezoneOffset() * 60 * 60 * 1000
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
    // vocabulary: {
    //   _get_err: `${this.$t('error_element_geted')}, ${this.$t('code_error')}`,
    //   _post_err: `${this.$t('error_element_created')}, ${this.$t('code_error')}`,
    //   _put_err: `${this.$t('error_element_updated')}, ${this.$t('code_error')}`,
    //   _delete_err: `${this.$t('error_element_deleted')}, ${this.$t('code_error')}`
    // }
  },
  // TODO: use lazy: true
  asyncComputed: {
    // object backends
    schedules: {
      lazy: true,
      async get () {
        let res = await this.$store.dispatch('getSchedules', `${this.$t('error_element_geted')}, `)
        return res
      },
      default: {}
    },
    scheduleDetails: {
      lazy: true,
      async get () {
        let res = await this.$store.dispatch('getScheduleDetails', `${this.$t('error_element_geted')}, `)
        return res
      },
      default: {}
    }
  },
  methods: {
    //
    dayTimeItems (scheduleId, fullTime) {
      let schData = this.scheduleDetails ? this.scheduleDetails[scheduleId] : null
      if (!schData) {
        return []
      }
      // start of day with time 'fullTime'
      let dayStart = date.startOfDate(fullTime, 'day')
      // end of day with time 'fullTime'
      let dayEnd = date.endOfDate(fullTime, 'day')
      return schData.details.filter(d => {
        // filter all schedule times with getting interval
        return fullTime && date.isBetweenDates(this.convertTimeToMili(d.time), dayStart, dayEnd)
      })
    },
    // load authData from cookies
    loadFromCookieToStore () {
      let authData = Cookies.get('sch-authData')
      if (authData) {
        this.$store.dispatch('login', authData)
      }
    },
    _notify (msg, detailMessage = '', notifyType = 'info') {
      Notify.create({
        message: msg,
        type: notifyType,
        timeout: 5000,
        detail: detailMessage,
        position: 'bottom-left',
        actions: [
          {
            icon: 'close'
          }
        ]
      })
    },
    notifyInfo (msg, detailMessage = '') {
      this._notify(msg, detailMessage, 'info')
    },
    notifyWarning (msg, detailMessage = '') {
      this._notify(msg, detailMessage, 'warning')
    },
    notifyPositive (msg, detailMessage = '') {
      this._notify(msg, detailMessage, 'positive')
    },
    notifyNegative (msg, detailMessage) {
      this._notify(msg, detailMessage, 'negative')
    },
    // default notify by array errors
    defaultNotifyByErrors (msg, errors) {
      let reasons = []
      for (let i in errors) {
        let reason = errors[i].reason
        let info = ''
        // if error.value
        if (errors[i].value) {
          info = `value: ${errors[i].value}`
        }
        // if error.id
        if (errors[i].id) {
          if (info) {
            info = `${info}, id: ${errors[i].id}`
          } else {
            info = `id: ${errors[i].id}`
          }
        }
        // add message
        if (info) {
          reason = `${reason} (${info})`
        }
        reasons.push(reason)
      }
      msg = msg || this.$t('acc')
      this.notifyNegative(`${msg}: ${reasons.join()}`)
    },
    // to format-date
    applyFormatDate (value) {
      return date.formatDate(value * 1000, 'DD.MM.YYYY HH:mm:ss')
    },
    // convet color form number to HEX & vice versa
    convertColor (color) {
      let result
      // from  16-number-system to HEX
      if (isFinite(color)) {
        result = '#' + Math.abs(parseInt(color)).toString(16)
        // from  HEX to 16-number-system
      } else if (color && typeof color === 'string') {
        result = parseInt(color.substr(1), 16)
      }
      return result
    },
    convertTimeToSec (val) {
      return Math.round(val / 1000)
    },
    convertTimeToMili (val) {
      val = val || 0
      return Math.round(val * 1000)
    }
  }
}
