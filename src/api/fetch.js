import axios from 'axios'
import Qs from 'qs'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api'
} else {
  axios.defaults.baseURL = ''
}
// 请求超时时间
axios.defaults.timeout = 30000
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 请求拦截
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data)
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use(res => {
  // 处理响应数据
  return res
}, err => {
  return Promise.reject(err)
})
// 封装get
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
      // 请求成功
    }).catch(err => {
      reject(err.data)
      // 请求错误
    })
  })
}
// 封装post
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
        // 请求成功
      }).catch(err => {
        reject(err.data)
        // 请求错误
      })
  })
}
