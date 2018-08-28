// logic for Geofences
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all points or some point by id
    async getPoints (params, m) {
      params = params || {}
      // data from request
      let res = await this._get(`schedule-details/${getValueByParam(params.ids)}`, calcGetParams(params, ['name', 'fields', 'schedule_ids']))
      return res
    },
    async createPoints (data, params, m = true) {
      params = params || {}
      // data from request
      let res = await this._post('schedule-details', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updatePoints (data, params, m = true) {
      params = params || {}
      let res = await this._put('schedule-details', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deletePoints (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`schedule-details/${getValueByParam(params.ids)}`, {})
      return res
    }
  }
}
