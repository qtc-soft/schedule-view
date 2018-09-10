// logic for Users
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all users or some user by id
    async getUsers (params, m) {
      params = params || {}
      // data from request
      let res = await this._get(`users/${getValueByParam(params.ids)}`, calcGetParams(params, ['name', 'fields']), m)
      return res
    },
    async createUsers (data, params, m) {
      params = params || {}
      // data from request
      let res = await this._post('users', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updateUsers (data, params, m) {
      params = params || {}
      let res = await this._put('users', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deleteUsers (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`users/${getValueByParam(params.ids)}`, {}, m)
      return res
    }
  }
}
