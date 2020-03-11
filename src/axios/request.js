import axios from 'axios'
import jsonBigint from 'json-bigint'
axios.defaults.transformResponse = [function (data) {
  return data ? jsonBigint.parse(data) : {}
}]
// import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.interceptors.request.use(function (config) {
  // 获取token
  const token = window.localStorage.getItem('user-login')
  // 统一将token参数赋值给请求,每次发送请求都携带token
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // 将axios返回的数据再封装一次
  return response.data ? response.data : {}
}, function (error) {
  // 响应错误对象
  // if (error.response.status === 401) {
  //   localStorage.removeItem('user-login')
  //   router.push('/login')
  // }
  return Promise.reject(error)
})

export default axios
