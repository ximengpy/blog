
import axios from "axios";
import {baseurl} from '../utils/baseURL'

//配置默认的参数
axios.defaults.baseURL = baseurl;//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/json"; //设置POST请求格式

export default {
  // 获取文章信息
  getArticleInfo(){
    return axios.post("/api/article/getInfo")
  },
  getArticleHot(limit = 8){
    // 获取热门文章
    return axios.post('/api/article/getHot',{limit});
  },

  // 获取单篇文章
  getArticle(_id) {
    return axios.post('api/article', {_id})
  },
  getArticleShow:(
    // 获取文字列表
    function(){
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
        return axios.post('/api/article/getshow',data)
      }
    }
  )(),

  // 获取延伸阅读
  getArticleExtend(tag) {
    return axios.post('/api/article/extend', {tag})
  },

  // 搜索文章
  getArticleSearch(keywords) {
    return axios.post('/api/article/search', {keywords} )
  },

    // 获取验证码图片
    getRegisterVcode() {
      return axios.post('/api/register/vcode')
    },
    //检查验证码
    getRegisterCheckVcode(svgCode){
      return axios.post('/api/register/checkVcode',{svgCode})
    },
    //注册提交
    postRegister(options) {
      return axios.post('/api/register',options)
    },

    //登录
    postLogin(form) {
      return axios.post('/api/login',form)
    },
    //退出登录
    postLogout() {
      return axios.post('/api/login/logout')
    },
    //验证是否通过
    postIflogin() {
      return axios.post('/api/login/iflogin')
    },
    // 留言的接口
    commitMessage({user,content}) {
      return axios.post('/api/message/commit',{user,content})
    },
    //  留言的留言接口 options => {user: 'id',content: '',$user: ""}
    commitChildMessage(options) {
      return axios.post('/api/message/childCommit', options)
    },
    // 获取留言列表
    getMessageList(skip = 0, limit = 99) {
      return axios.post('api/message/getlist', {skip, limit})
    },

    // 获取最近访客
    getVisitor() {
      return axios.post('api/visitor')
    }

};
