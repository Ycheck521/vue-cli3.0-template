import axios from 'axios'

axios.defaults.timeout = 3000
axios.defaults.baseURL = ''

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 设置请求的配置
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // if (config.method === 'post') {
    //   config.data = qs.stringify({
    //     ...config.data
    //   })
    // }
    // if (store.state.token) {
    //   config.headers['x-access-token'] = store.state.token
    // }
    // if (config.url.indexOf('markData/report') < 0) {
    //   config.headers['x-wejoydata-brand-name'] = store.state.userData.brandName
    //   config.headers['x-wejoydata-source'] = store.state.markData.firstChannel || store.state.userData.source
    //   config.headers['x-wejoydata-subSource'] = store.state.markData.subChannel || store.state.userData.subSource
    // }

    // 追加时间戳，防止请求缓存问题
    config.url = config.url + (config.url.indexOf('?') !== -1 ? '&' : '?') + 't=' + Date.now()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    // 根据业务需求处理返回结果
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
