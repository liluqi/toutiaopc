import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.interceptors.request.use(function (config) {
  // 获取token
  const token = window.localStorage.getItem('user-login')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // 将axios返回的数据再封装一次
  return response.data ? response.data : {}
}, function (error) {
  return Promise.reject(error)
})

export default axios
