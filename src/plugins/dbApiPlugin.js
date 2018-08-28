// plugin for requests to MGate
import baseMethods from './_base_methods'

import Auth from './dbApi/_authorization'
import Users from './dbApi/_users'
import Schedules from './dbApi/_schedules'
import ScheduleDetails from './dbApi/_schedule_details'

// plugin MGate
let MGateExtApiPlugin = {}

// TODO: Add base-methods to options (defaultNotifyByErrors, notifyNegative, ...)
// install-func of plugin
MGateExtApiPlugin.install = function (Vue, options) {
  // logic
  let mExtApi = {
    v: Vue,
    // request-client
    apiClient: baseMethods.createApiClient(options),
    // api-paths
    api_paths: {
      ...Auth.api_paths,
      ...Users.api_paths,
      ...Schedules.api_paths,
      ...ScheduleDetails.api_paths
    },

    // BASE-METHODS
    methods: {
      ...options.methods
    },

    // BASE-API-METHODS:
    ...baseMethods.methods,

    // API-METHODS:
    ...Auth.apiMethods,
    ...Users.apiMethods,
    ...Schedules.apiMethods,
    ...ScheduleDetails.apiMethods
  }

  // register in Vue
  Vue.prototype.$dbAPI = mExtApi
  Vue.dbAPI = mExtApi
}

export default MGateExtApiPlugin
