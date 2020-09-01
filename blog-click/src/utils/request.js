import axios from 'axios'
import {baseurl} from './baseURL'
// 创建实例,配置实例的配置
const request = axios.create({
  // 基准路径
  baseURL: baseurl,
  withCredentials: true,
  // 响应超时
  timeout: 120000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 需要添加token,修改请求的配置,在这里添加
  config.data = config.data ? config.data : {}
  return config
  // return config
}, function (err) {
  return Promise.reject('网络错误')
  // 对请求错误做些什么
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 可以判断返回的错误码,对业务逻辑进行统一处理,捕获错误
  // 判断返回的数据类型
  if(response.data.code === 0 ) {
    return response.data
  }else {
    return Promise.reject(response.data.msg)
  }

}, function (error) {

  return Promise.reject('网络错误')
})

export default request
