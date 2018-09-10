import Vue from 'vue'
import axios from 'axios'

// install-func of plugin
let baseMethods = {
// create axios-object
  createApiClient: function (options) {
    // api-client
    let client = axios.create({
      baseURL: (options && options.basePath) ? options.basePath : '/api',
      withCredentials: true
      // timeout: 1000,
      // headers: {
      //   'header': 'value'
      // }
    })
    return client
  },
  // api-client
  apiClient: null,

  // api-paths
  api_paths: {
  },

  // BASE-METHODS
  methods: {
    // set header for requests
    setHeader (name, value) {
      Vue.set(this.apiClient.defaults.headers.common, name, value)
    },
    // delete header for requests
    delHeader (name) {
      Vue.delete(this.apiClient.defaults.headers.common, name)
    },
    // request method GET
    async _get_request (url, getParams) {
      // response
      let resp = await this.apiClient({
        method: 'get',
        url: url,
        params: getParams
      })
      return resp
    },
    // request method POST
    async _post_request (url, getParams, data) {
      // response
      let resp = await this.apiClient({
        method: 'post',
        url: url,
        params: getParams,
        data: data
      })
      return resp
    },
    // request method PUT
    async _put_request (url, getParams, data) {
      // response
      let resp = await this.apiClient({
        method: 'put',
        url: url,
        params: getParams,
        data: data
      })
      return resp
    },
    // request method DELETE
    async _del_request (url, getParams) {
      // response
      let resp = await this.apiClient({
        method: 'delete',
        url: url,
        params: getParams
      })
      return resp
    },

    // m: notify message - notify or not
    // request method GET with base handler
    async _get (url, getParams, m) {
      // result
      let res = null
      try {
        // response
        let resp = await this._get_request(url, getParams)

        // if result.errors - notify
        if (resp.data.errors && resp.data.errors.length && m) {
          this.methods.defaultNotifyByErrors(m, resp.data.errors)
        }
        // set return value
        if (resp.data) {
          res = resp.data
        }
      } catch (error) {
        // error-message
        // this.methods.notifyNegative(`Request failed, code ${error.response.status}`, error.response.statusText)
        if (m) {
          this.methods.notifyNegative(`${m} ${error.response.statusText}`)
        }
        res = error.response
      }

      return res
    },
    // request method POST with base handler
    async _post (url, getParams, data, m) {
      // result
      let res = null
      try {
        // response
        let resp = await this._post_request(url, getParams, data)

        // if result.errors - notify
        if (resp.data.errors && resp.data.errors.length && m) {
          this.methods.defaultNotifyByErrors(m, resp.data.errors)
        }
        // set return value
        if (resp.data) {
          res = resp.data
        }
      } catch (error) {
        // error-message
        // this.methods.notifyNegative(`Request failed, code ${error.response.status}`, error.response.statusText)
        if (m) {
          this.methods.notifyNegative(`${m} ${error.response.statusText}`)
        }
        res = error.response
      }

      return res
    },
    // request method PUT with base handler
    async _put (url, getParams, data, m) {
      // result
      let res = null
      try {
        // response
        let resp = await this._put_request(url, getParams, data)

        // if result.errors - notify
        if (resp.data.errors && resp.data.errors.length && m) {
          this.methods.defaultNotifyByErrors(m, resp.data.errors[0])
        }
        // set return value
        if (resp.data) {
          res = resp.data
        }
      } catch (error) {
        // error-message
        // this.methods.notifyNegative(`Request failed, code ${error.response.status}`, error.response.statusText)
        if (m) {
          this.methods.notifyNegative(`${m} ${error.response.statusText}`)
        }
      }

      return res
    },
    // request method DELETE with base handler
    async _delete (url, getParams, m) {
      // result
      let res = null
      try {
        // response
        let resp = await this._del_request(url, getParams)

        // if calc request
        // if result.errors - notify
        if (resp.data.errors && resp.data.errors.length && m) {
          this.methods.defaultNotifyByErrors(m, resp.data.errors[0])
        }
        // set return value
        if (resp.data) {
          res = resp.data
        }
      } catch (error) {
        // error-message
        // this.methods.notifyNegative(`Request failed, code ${error.response.status}`, error.response.statusText)
        if (m) {
          this.methods.notifyNegative(`${m} ${error.response.statusText}`)
        }
      }

      return res
    }
  }
}

export default baseMethods
