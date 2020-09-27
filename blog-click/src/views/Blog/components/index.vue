<template>
  <div>
    <div class="message">
      <div class="main">
        <div v-if="articleInfo">
          <section class="title">
            <h4>{{articleInfo.title}}</h4>
            <p>
              <small>
                作者：<a href="javascript:void(0)">py</a>
              </small>
              <small class="ml10">围观群众：<i class="readcount">{{articleInfo.pv}}</i></small>
              <small class="ml10">更新于 <label>{{articleInfo.updateDate | getTime}}</label> </small>
            </p>
          </section>
          <section class="time">
            <p class="date">{{articleInfo.date | date}}</p>
            <p class="month">{{articleInfo.date | month}}<span>月</span></p>
            <p class="year">{{articleInfo.date | year}}</p>
          </section>
          <section class="content" v-html='articleInfo.content'  v-heghtjs>{{articleInfo.content}}</section>
          <div class="content-like" @click="handleLike">
            <p class="like-text">点赞（{{articleInfo.like}}）<i class="iconfont icon-dianzan"></i></p>
          </div>
          <section class="copyright">
            <p class="f-toe fc-black">
              非特殊说明，本文版权归 py所有，转载请注明出处.
            </p>
            <p class="f-toe">
              本文标题：
              <a href="javascript:void(0)" class="r-title">py</a>
            </p>
            <p class="f-toe">
              本文网址：
              <a href="http://blog.ximengpy.top:3000/">http://blog.ximengpy.top:3000/</a>
            </p>
          </section>
          <section class="extend">
            <h6>延伸阅读</h6>
            <ol>
              <li class="f-toe" v-for="(item,index) in extendList" :key="index">
                <!-- <router-link :to="/article/+item._id">{{item.title}}</router-link> -->
                <span @click="handleToRouter(item._id)">{{item.title}}</span>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import '@/assets/css/markdown/dark.css' //引入代码高亮的css
import hljs from 'highlight.js'
  import {getArticle ,getArticleExtend, ArticleLike } from '@/api/index'
  import Vue from 'vue'
  Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})


  function toTwo(num){
    return (num<10?"0":"") + num;
  }
  export default {
    name: "Article",
    data(){
      return {
        articleInfo : null,
        extendList : []
      }
    },
    inject: ['reload'],
    filters:{
      getTime(val){
        let date = new Date(val);

        let YY = toTwo(date.getFullYear()),
          MM = toTwo(date.getMonth()+1),
          DD = toTwo(date.getDate()),
          h = toTwo(date.getHours()),
          m = toTwo(date.getMinutes()),
          s = toTwo(date.getSeconds());

        return `${YY}/${MM}/${DD} ${h}:${m}:${s}`;
      },
      date(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
      },
      month(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
      },
      year(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
      }
    },
    created() {
      //文章信息
      getArticle(this.$route.params.id)
        .then(res=>{
          if (res.code === 0) {
            this.articleInfo = res.data;
            //延伸阅读
            getArticleExtend(res.data.tag)
              .then(res=>{
                this.extendList = res.data;
              })

          }else{
            this.$router.push('/404')
          }
        })
        .catch(e=>{
          this.$router.push('/404')
        });


    },
    methods: {
      handleToRouter(id) {
        this.$router.push('/article/'+id)
        this.reload()
      },
      handleLike() {
        ArticleLike(this.articleInfo._id).then(res => {

          this.articleInfo.like++
        })
        .catch(err => {
          this.$message({
            message: '点赞失败',
            type: 'error'
          })
        })

      }
    }
  }
</script>

<style scoped lang="less">
@import url('../../../styles/markdown.less');

  .f-toe {
    overflow: hidden;
    word-wrap: normal !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    cursor: pointer;
  }
  .message {
    box-sizing: border-box;
    max-width: 1360px;
    padding: 70px 50px;
    margin: 0 auto;
    color: #515250;
    overflow: hidden;

    .main {
      position: relative;
      box-sizing: border-box;
      width: 70%;
      margin: 0 auto;
      padding: 30px 20px;
      color: #515250;
      background-color: #fff;

      section.title {
        padding: 5px 130px 5px 0;
        border-bottom: 1px solid #e8e9e7;
        font-weight: 400;

        h4 {
          margin-top: 5px;
          font-size: 20px;
          font-weight: normal;
          color: #515250;
        }

        p {
          color: #787977;
          margin-top: 10px;

          a {
            color: #3e8bc7 !important;
          }

          .ml10 {
            margin-left: 10px;
          }
        }
      }

      section.time {
        width: 90px;
        height: 70px;
        position: absolute;
        right: 10px;
        top: 15px;
        background-color: #fff;
        padding: 0 20px 5px 20px;
        line-height: 32px;

        .date {
          display: block;
          text-align: center;
          font-weight: 700;
          font-size: 40px;
          color: #6bc30d;
          position: relative;
          top: 2px;
        }

        .month {
          display: inline-block;
          color: #989997;
          font-size: 18px;

          span {
            font-size: 14px;
          }
        }

        .year {
          display: inline-block;
          color: #989997;
          margin-left: 10px;
          font-size: 18px;
        }
      }

      section.content {
        padding-bottom: 20px;
        font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc", "Microsoft Yahei", sans-serif;
        margin: 20px 0 0 0;
        line-height: 28px;
        position: relative;
        min-height: 200px;

        .code {
          background-color: #fff5f5;
          color: #ff502c;
          font-size: .87em;
          padding: .065em .4em;
        }
      }
      .content-like {
        border-bottom: 1px solid #e1e2e0;
        text-align: center;
        margin-top: 20px;
        padding-bottom: 30px;

        & .like-text {
          width: 100px;
          height: 30px;
          line-height: 30px;
          margin: auto;
          background-color:#6bc30d;
          color: #fff;
          cursor: pointer;
        }
      }


      section.copyright {
        clear: both;
        background-color: #f8f9f7;
        padding: 15px 20px;
        line-height: 22px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, .8);
        font-size: 12px;
        color: #787977;



        a {
          color: #3e8bc7;
          text-decoration: none;

          &:hover {
            color: #6bc30d;
          }
        }
      }

      section.extend {
        h6 {
          margin: 20px 0;
          border-left: 3px solid #6bc30d;
          min-height: 26px;
          line-height: 26px;
          padding: 5px 20px;
          background-color: #f8f9f7;
          font-size: 16px;
          font-weight: 400;
          color: #585957;
          text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
          clear: both;
        }
        ol{
          li::before{
            content: "◈";
            margin-right: 5px;
            color: #787977;
          }
          span{
            color: #3e8bc7;
            &:hover{
              color: #6bc30d;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 966px) {
    .message {
      padding: 70px 10px;
      & .ml10 {
        display: block;
        margin-left: 0 !important;
      }
      .main {
        width: 100%;
        padding-top: 10px;
      }
      section.title {
        & h4 {
          text-overflow:ellipsis;
          overflow:hidden;
          white-space:nowrap;
          margin-bottom: 10px;
        }
      }
      section.time {
        top: 50px !important;
      }
      img {
        width: 100%;
      }
    }
  }

</style>
