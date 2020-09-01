
import request from '../utils/request'

//配置默认的参数
// axios.defaults.baseURL = baseurl;//默认访问地址
// axios.defaults.withCredentials = true; //跨域允许携带cookie
// axios.defaults.headers.post["Content-Type"] = "application/json"; //设置POST请求格式

 // 获取文章信息
export const getArticleInfo = function() {
    return request({
      url: '/api/article/getInfo',
      method: 'post'
    })
  }
  // 获取热门文章
  export const getArticleHot = function(limit = 8) {
    return request({
      url: '/api/article/getHot',
      method: 'post',
      data: {
        limit
      }
    })
  }
  //获取单个文章
  export const getArticle = function(_id) {
    return request ({
      method: 'post',
      url: '/api/article',
      data: {
        _id
      }
    })
  }
  //获取文章列表
  // getArticleShow:(
  //   // 获取文字列表
  //   function(){
  //     let skip = 0
  //     let limit = 5
  //     return function(index=0,ifFresh) {
  //       if(ifFresh) {
  //         skip = 0
  //         limit = 5
  //       }
  //       let tag = ['','HTML&Css','JavaScript','Node','Vue&React','Other'][index]
  //       let data = {skip,limit,tag}
  //       skip += limit
  //       limit = 2
  //       return axios.post('/api/article/getshow',data)
  //     }
  //   }
  // )()

  export const getArticleShow = (function () {
      let skip = 0
      let limit = 5
      return function(index=0,ifFresh) {
        if(ifFresh) {
          skip = 0
          limit = 5
        }
        let tag = ['','HTML&Css','JavaScript','Node','Vue&React','Other'][index]
        let data = {skip,limit,tag}
        skip += limit
        limit = 2
        return request ({
          method: 'post',
          url: '/api/article/getshow',
          data: data
        })
      }
  })()

  //获取延申阅读
  export const getArticleExtend = function(tag) {
    return request({
      method: 'post',
      url: '/api/article/extend',
      data: {tag}
    })
  }

  //搜索文章
  export const getArticleSearch = function(keywords) {
    return request({
      method: 'post',
      url: '/api/article/search',
      data:{ keywords}
    })
  }

  //获取验证码图片
  export const getRegisterVcode = function(svgCode) {
    return request({
      url: '/api/register/vcode',
      method: 'post',
      data: {svgCode}
    })
  }
  // 检查验证码
  export const getRegisterCheckVcode = function(svgCode) {
    return request({
      url: '/api/register/checkVcode',
      method: 'post',
      data: {svgCode}
    })
  }

  //注册提交
  export const postRegister = function(options) {
    return request({
      url: '/api/register',
      method: 'post',
      data: options
    })
  }
  //登录

  export const postLogin = function(form) {
    // console.log(form)
    return request({
      url: '/api/login',
      method: 'post',
      data:form
    })
  }
  //退出登录
  export const postLogout = function(form) {
    return request({
      url: '/api/login/logout',
      method: 'post',
      data: form
    })
  }

  //验证是否通过
  export const postIflogin = function() {
    return request({
      url: '/api/login/iflogin',
      method: 'post',
    })
  }
  //留言的接口
  export const commitMessage = function({user,content}) {
    return request({
      url: '/api/message/commit',
      method: 'post',
      data: {user, content}
    })
  }
  //留言的留言的接口
  export const commitChildMessage = function(options) {
    return request({
      url: '/api/message/childCommit',
      method: 'post',
      data: options
    })
  }

  //获取留言列表
  export const getMessageList = function(skip = 0, limit = 99) {
    return request({
      url: 'api/message/getlist',
      method: 'post',
      data: {skip, limit}
    })
  }
  //获取最近访客
  export const getVisitor = function() {
    return request({
      url: 'api/visitor',
      method: 'post',
    })
  }



//     // 获取最近访客
//     getVisitor() {
//       return axios.post('api/visitor')
//     }

// };
