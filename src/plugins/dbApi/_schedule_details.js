// logic for Geofences
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all points or some point by id
    async getScheduleDetails (params, m) {
      params = params || {}
      // data from request
      let res = await this._get(`schedule-details/${getValueByParam(params.ids)}`, calcGetParams(params, ['ids', 'name', 'fields']), m)
      return res
    },
    async createScheduleDetails (data, params, m) {
      params = params || {}
      // data from request
      let res = await this._post('schedule-details', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updateScheduleDetails (data, params, m) {
      params = params || {}
      let res = await this._put('schedule-details', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deleteScheduleDetails (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`schedule-details/${getValueByParam(params.ids)}`, {}, m)
      return res
    },
    async getScheduleOrders (params, m) {
      params = params || {}
      // data from request
      let res = await this._get(`schedule-orders/${getValueByParam(params.ids)}`, calcGetParams(params, ['ids', 'name', 'schedules', 'customers', 'status']), m)
      return res
    }
  }
}
