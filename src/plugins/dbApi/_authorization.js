// logic for TSP

export default {
  // paths
  api_paths: {
    login: 'user-login',
    logout: 'user-logout',
    registration: 'user-registration',
    is_auth: 'is-auth'
  },
  apiMethods: {
    // login
    async login (login, password, m) {
      // data from request
      let respData = await this._post(this.api_paths.login, {}, {login: login, password: password}, m)
      return respData
    },
    // logout
    async logout (m) {
      // data from request
      let respData = await this._post(this.api_paths.logout, {}, {}, m)
      return respData
    },
    async registration (data, params, m) {
      params = params || {}
      // data from request
      let res = await this._post(this.api_paths.registration, {}, data, m)
      return res
    },
    // is-auth, check sid
    async isAuth (m = false) {
      // data from request
      let respData = await this._post(this.api_paths.is_auth, {}, {}, m)
      return respData
    }
  }
}
