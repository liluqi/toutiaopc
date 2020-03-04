import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.interceptors.request.use(function (config) {
  // 获取token
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios
