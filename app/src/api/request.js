// 对于 axios 二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入 store
import store from '@/store'

// 利用 axios 对象的方法 create 创建一个 axios 实例
const requests = axios.create({
  // 配置对象
  baseURL: '/api', // 基础路径，发请求的时候，路径中会出现 api
  timeout: 5000 // 请求超时的时间
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，在请求发出去前做一些事情
requests.interceptors.request.use(config => {
  // config: 配置对象，对象里面有一个 headers 请求头
  nprogress.start() // 进度条开始动
  if (store.state.detail.uuid_token) {
    // 请求头添加新字段
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带 token 带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  return config
})

// 响应拦截器
requests.interceptors.response.use(
  res => {
    // 响应成功的回调函数：服务器响应数据回来后，响应拦截器可以检测到，做一些事情
    nprogress.done() // 进度条结束
    return res.data
  },
  error => {
    // 响应失败的回调函数：
    return Promise.reject(new Error('failed'))
  }
)

// 向外共享
export default requests
