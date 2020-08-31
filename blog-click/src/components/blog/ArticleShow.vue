<template>
<div class="articleShow">
  <section v-for="(item,index) in articleList " :key="index">
    <h5>
      <span>【{{item.type}}】</span>
      <a href="">{{item.title}}</a>
    </h5>
    <div class="time">
      <p class="date">{{item.date |date}}</p>
      <span class="month">{{item.date | month}} <span>月</span> </span>
      <span class="year">{{item.date | year}}</span>
    </div>
    <div class="content" >
      <!-- <router-link :to="/article/+item._id" :style="{backgroundImage: 'url('+item.surface+')'}">
        <i></i>
      </router-link> -->
      <router-link :to="/article/+item._id" class="content-title" v-html="item.content" >
        {{item.content}}
      </router-link>
    </div>
    <div class="read-more">
      <router-link :to="/article/+item._id">继续阅读</router-link>
    </div>
    <div class="bottom">
      <div class="fl">
        <i class="el-icon-s-promotion"></i>
        <router-link :to="/article/+item._id">个人日记</router-link>
      </div>
      <div class="fr">
        <span class="view">
          <i class="el-icon-view"></i>
          <i>{{item.pv}}</i>
        </span>
        <span class="comment">
          <i class="el-icon-chat-dot-round" style="font-size:18px"></i>
          <i>{{item.comment.length}}</i>
        </span>
      </div>
    </div>
  </section>
  <p class="loading" v-show="isloading">正在加载中</p>
  <p class="no-more" v-if="ifNomore">我也是有底线的！！！！</p>

</div>
</template>
<script>
import request from "../../api/index"

const getArticleShow = request.getArticleShow
export default {
  name: 'ArticleShow',
  mounted() {
    this.getArticleShowFresh(),
  // 监听滚轮事件
  window.addEventListener("scroll",this.handleScroll)
  },
  methods:{
    handleScroll() {
      if(this.ifNomore) return
      // this.ifloading = true
      // 文档高
      let c = document.body.scrollHeight
      // 滚动高
      let a = document.documentElement.scrollTop
      // 可视区高
      let b = document.documentElement.clientHeight
      // console.log(a,b,c)
      if(a+b >= c-200){
        getArticleShow(this.id,false)
        .then((res) =>{
          this.ifloading = true
          let data = res.data.data
          if(data.length){
            this.articleList.push(...res.data.data)
            console.log(this.articleList)
          }else {
            this.ifNomore = true
          }
    })
  }
  },
  getArticleShowFresh() {
    this.ifNomore = this.ifloading = false
    getArticleShow(this.id,true)
    .then((res) =>{
      this.articleList= res.data.data
    })
  }
  },
  computed: {
    id(){
      return this.$route.params.id
    }
  },
  watch: {
  id(){
    this.getArticleShowFresh()
    document.documentElement.scrollTop = 0
  }
  },

  data() {
  return {
    x:'',
    articleList:[],
    dateReg:/^(\d{4})-(\d{1,2})-(\d{1,2})/,
    ifNomore: false,
    isloading: false
  }
  },
  filters: {
    date(value){
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3]
    },
    month(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2]

    },
    year(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1]

    }
  },
  destroyed() {
     window.removeEventListener("scroll",this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
.articleShow {
  > section {
    overflow: hidden;
    position: relative;
    width: 100%;
    padding: 20px 15px 25px;
    margin-bottom: 20px;
    background-color: #fff;
    box-sizing: border-box;
    transform: scale(.3);
    animation:show 1s;
    animation-fill-mode: forwards;
    @keyframes show {
      from{
        opacity: .5;
        transform: scale(.3);
      }
      to{
        opacity: 1;
        transform: scale(1);
      }
    }
    // :nth-child(1) ::before{
    //   content:"置顶";
    //   position: absolute;
    //   left: -18px;
    //   top: 9px;
    //   height: 20px;
    //   line-height: 20px;
    //   text-align: center;
    //   width: 74px;
    //   background-color: #ff5722;
    //   color: #fff;
    //   transform: rotate(-45deg);

    // }
    & h5{
      line-height: 30px;
      padding: 5px 130px 5px 0;
      border-bottom: 1px solid #e8e9e7;
      font-weight: 400px;
      & span {
        font-size: 16px;
        font-weight: 400;
        vertical-align: bottom;
        color: #2ea7e0;
      }
      & a{
        color: #787977;
        font-size: 14px;
        &:hover{
          color:#6bc30d;
          text-decoration: underline;
          }
        }

    }
    & .time {
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: #fff;
      padding: 0 20px 5px 20px;
      line-height: 32px;
      & .date {
        position: relative;
        top: 2px;
        text-align: center;
        font-weight: 700px;
        font-size: 40px;
        color: #6bc30d;
      }
      & .month {
        display: inline-block;
        margin-right: 7px;
        color: #989997;
        font-size: 18px;
        & span {
        }
      }
      & .year {
        color: #989997
      }
    }
    & .content {
      position: relative;
      margin-top: 20px;
      line-height: 20px;
      & .content-title {
        display: inline-block;
        height: 102px;
        text-overflow:ellipsis;
        overflow:hidden;
        text-indent: 20px;
        transition: all .2s;
      }
    }
    & .read-more{
      position: relative;
       &::before {
        content: "";
        display: inline-block;
        height: 1px;
        top: 20px;
        left: 100px;
        right: 0;
        position: absolute;
        background-color: #d0d0d0;
      }
      & a {
        font-weight: bold;
        color: #383937;
        line-height: 40px;
        &:hover{
          color:#6bc30d;
          text-decoration: underline;
          }
      }

    }
    & .bottom {
      .fl{
        float: left;
        color: #666;
        & i {
          font-size: 16px;
          margin-right: 5px;
          color: #999;
        }
        & span {
          display: inline-block;
          font-size: 12px;
          padding: 2px 5px;
          background-color: #f1f2f0;
          color: #787977;
          margin: 2px;
          transition: all .2s;
          cursor: pointer;
          & :hover{
            color: #fff;
            background: #6bc30d;
          }
        }



      }
      & .fr {
        float: right;
        i {
          display: inline-block;
          margin-right: 3px;
          font-style: normal;
        }
        & .comment {
          display: inline-block;
          margin-left: 20px;
        }
      }
    }
  }
  .loading {
    background-color: #fff;
    height: 42px;
    line-height: 42px;
    text-align: center;
  }
  .no-more {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    font-size: 15px;
  }
}
</style>
