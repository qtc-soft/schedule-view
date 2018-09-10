// logic for Tracks
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all tracks or some track by id
    async getSchedules (params, m) {
      params = params || {}
      // get accessable categorites from database
      let res = await this._get(`schedules/${getValueByParam(params.ids)}`, calcGetParams(params, ['name']), m)
      return res
    },
    async createSchedules (data, params, m) {
      params = params || {}
      // data from request
      let res = await this._post('schedules', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updateSchedules (data, params, m) {
      params = params || {}
      let res = await this._put('schedules', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deleteSchedules (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`schedules/${getValueByParam(params.ids)}`, {}, m)
      return res
    }
  }
}
