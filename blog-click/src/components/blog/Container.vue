<template>
 <div id="container">
    <el-container >
    <el-main>
      <article-show></article-show>
    </el-main>
    <el-aside>
      <div :class="['search',{'fixed':ifSearchFixed}]">
        <div class="search-main">
          <input
            @input="handleInput"
            v-model="searchInput"
            placeholder="请输入内容">
          <i class="el-icon-search"></i>
          <ul v-if="!!searchList.length" class="search-list">
            <li
              v-for="(item,index) in searchList"
              :key="index"
              class="search-item"
            >
              <router-link :to="'/Article/'+item._id">{{item.title}}</router-link></li>
          </ul>
        </div>
        <div class="search-aricle">
          <ul @mouseleave="handleMouseLeave">
            <li
              @mouseenter="handleMouseEnter(index)"
              v-for="(item,index) in getArticleTags"
              :key="index"><router-link
              :to="'/blog/'+index">
              {{item}}
            </router-link></li>
          </ul>
          <div class="cover" :style="{top:coverTop*40+'px'}"></div>
        </div>
      </div>
      <div class="hot">
        <h3>热门文章</h3>
        <ul>
          <li v-for="(item,index) in articleHot" :key="index">
            <i>{{index+1}}</i>
            <router-link  :to="/article/+item._id">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="recommend">
         <ul>
        <h3>置顶推荐</h3>
          <li v-if="!!getArticleHotTitle.title">
            <i>1</i>
            <router-link :to="/article/+getArticleHotTitle._id">{{getArticleHotTitle.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="visitor">
           <h3>最近访客</h3>
        <ul>

          <li v-for="(item,index) in visitors " :key="index" >
            <img  class="visitor-img" :src="item.photo" alt="">
            <p class="visitor-name">{{item.user}}</p>
          </li>
        </ul>
      </div>
    </el-aside>
  </el-container>
 </div>
</template>
<script>
import {getArticleInfo,getArticleHot, getArticleSearch, getVisitor } from "../../api/index"
import ArticleShow from "./ArticleShow"
// let getArticleInfo = request.getArticleInfo
// let getArticleHot = request.getArticleHot;
// let getArticleSearch = request.getArticleSearch
// let getVisitor = request.getVisitor
export default {
name: 'Container',
data () {
  return {
    searchInput:"", //搜索内容
    searchList: [], //搜索结果
    searchTimer: null, //节流

    // 文章分类
    articleTags: "",
    articleHot:'',
    // cover的top值
    coverTop: this.$route.params.id*1,
    ifSearchFixed:false,
    // 访客的数据
    visitors:[],
  }
},
components:{
  ArticleShow,
},
methods : {
  handleMouseEnter(index){
    this.coverTop = index
  },
  handleMouseLeave(){
    this.coverTop = this.$route.params.id*1
  },
   handleWindowScroll(){
    let scrollTop = document.documentElement.scrollTop
    this.ifSearchFixed = scrollTop>=900
  },
  handleInput() {
    clearTimeout(this.searchTimer);
     this.searchTimer = setTimeout(()=>{
          let keywords = this.searchInput.trim();//去除首位空格
          if (keywords) {
            getArticleSearch(keywords)
              .then(res=>{
                console.log(res)
                this.searchList = res.data;
              })
              .catch(()=>{
                this.searchList = [];
              });
          }else{
            this.searchList = [];
          }
        },1000);
  },

  // 获取最近访客
  getvisitor() {
    getVisitor().then(res =>{
      // console.log(res)
      const arrRes = res.data
      const arr = []
      arrRes.forEach((item, index) =>{
        // console.log(item)
        arr.push({
          photo: item.user.photo,
          user: item.user.user
        })
      })
      // console.log(arr)
      this.visitors = arr
    })
  }
},
computed:{
  getArticleTags() {
    return ["全部文章",...this.articleTags]
  },
  getArticleHotTitle() {
    return this.articleHot[0] || {}
  },
  // 控制search的class名字


},

created() {
  getArticleInfo()
  .then((res) =>{
    this.articleTags = res.data.tags
  })
  getArticleHot().then(res=>{
        this.articleHot = res.data;
      });
  //  最近访客
  this.getvisitor()
},
mounted(){
  // 监听window的滚动事件
  this.handleWindowScroll() //页面刷新时执行一次
  window.addEventListener("scroll",this.handleWindowScroll)
},
destroyed(){
  window.removeEventListener("scroll", this.handleWindowScroll)
}
}
</script>
<style lang="less" scoped>
  #container {
    padding: 80px;
    width: 100%;
    user-select:none;
    box-sizing: border-box;
    > .el-container {
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      height: 100%;
      margin: 0 auto;
      padding: 0 50px;
      .el-main {
        padding-top: 0;
        padding-left: 0;
      }
      .el-aside {
        width: 300px;
        >.search {
          width: 100%;
          background: #fff;
          padding-bottom: 10px;
          &.fixed {
            position: fixed;
            width: 300px;
            animation: searchMove .5s;
            animation-fill-mode: forwards;
          }
          @keyframes searchMove {
            0% {
              top:-500px;
            }
            40% {
              top: 110px;
            }
            70%{
              top: 100px;
            }
            100% {
              top: 121px;
            }
          }
          >.search-main {
            position:relative;
            box-sizing: border-box;
            width:100%;
            height: 80px;
            padding: 20px;
            background-color: grey;
            input {
             position: relative;
              z-index: 3;
              width: 100%;
              height: 40px;
              border-radius: 20px;
              border: 0;
              outline: 0;
              text-indent: 2em;
              z-index: 4;
            }
            i {
                position: absolute;
                z-index: 4;
                right: 35px;
                top: 29px;
                width: 22px;
                height: 22px;
                font-size: 18px;
                line-height: 22px;
                text-align: right;
                font-weight: bolder;
                color: rgb(120, 121, 119);
                cursor: pointer;
              }

              & .search-list {
                position: absolute;
                width: 260px;
                background-color: #fff;
                top: 44px;
                padding-top: 23px;
                border-radius:0 0 10px 10px;
                box-shadow: 0 0 2px #999;
                 z-index: 3;
              }
              & .search-item {
                overflow: hidden;
                box-sizing: border-box;
                width: 100%;
                height: 40px;
                line-height: 30px;
                padding: 5px;
              }
              & a {
                display: block;
                width: 100%;
                height: 100%;
                &:hover{
                  background-color: #ddd;
                }
              }
          }
          .search-aricle {
            position:relative;
            width: 100%;
            margin-top: 20px;
            z-index: 2;
            ul {
              width: 100%;
              li {
                position: relative;
                box-sizing: border-box;
                z-index: 1;
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 0 30px;
                a{
                  display: block;
                  width: 100%;
                  height: 100%;
                  color: #787977;
                  border-bottom: 1px #eee dotted;
                }
              }
            }
            .cover {
              position: absolute;
              left: 0;
              top: 0;
              box-sizing: border-box;
              width: 100%;
              height: 40px;
              border-right: 5px solid #000;
              background-color: rgba(0,0,0,.05);
              transition:top .2s;
            }
          }
        }
        >.hot,>.recommend{
          box-sizing: border-box;
          width: 100%;
          margin-top: 20px;
          background:#fff;
          padding:15px 20px;
          h3{
            padding:0 5px 8px;
            line-height: 30px;
            font-weight: 30px;
            border-bottom: 1px solid #e8e9e7;
            position: relative;
            font-size: 18px;
          }
          ul {
            margin-top: 5px;
            li{
              display: flex;
              height: 30px;
              line-height: 30px;
              margin: 8px 0;
              a{
                display: inline-block;
                width: 220px;
                color: #787977;
                font-size: 14px;
                text-overflow:ellipsis;
                overflow:hidden;
                white-space:nowrap;
                &:hover{
                  color:#6bc30d;
                  text-decoration: underline;
                }
              }
              i{
                display: inline-block;
                width: 22px;
                height: 22px;
                margin-right: 10px;
                margin-top: 5px;
                line-height: 22px;
                text-align: center;
                border-radius: 10px;
                background-color: #edefee;
                font-style: normal;
                font-size: 12px;
                text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
              }
              &:nth-child(1) i{
                background-color: darkorange;
                color: #fff;
              }
              &:nth-child(2) i{
                background-color: darkcyan;
                color: #fff;

              }
              &:nth-child(3) i{
                background-color: #6bc30d;
                color: #fff;

              }
            }
          }
        }
        .visitor{
           box-sizing: border-box;
          width: 100%;
          margin-top: 20px;
          background:#fff;
          padding:15px 20px;
          h3{
            padding:0 5px 8px;
            line-height: 30px;
            font-weight: 30px;
            border-bottom: 1px solid #e8e9e7;
            position: relative;
            font-size: 18px;
          }
          ul {
            margin-top: 15px;
            display: flex;
            flex-wrap: wrap;

            li {
              width: 25%;
              height: 50%;
              & .visitor-img{
                width: 58px;
                height: 58px;
              }
              & .visitor-name   {
                text-align: center;
              }
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 966px) {
        #container {
          padding: 0;

          .el-container {
            padding: 0;
          }
          & .el-aside {
            display: none;
          }

          & .el-main {
            margin-top: 79px;
            margin-left: 20px;

          }
        }

      }

</style>
