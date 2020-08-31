<template>
  <div id="app" :style="'width:'+bgWidth+'px'">

    <Header v-if="isshooHeader" />
    <div class="middle-box">
      <router-view v-if='isRouterlive' />
    </div>
    <div class="footer">
      <div class="footer-inner">
        <a class="link" href="http://www.beian.miit.gov.cn/"> 湘ICP备19023985号-1 </a>
        <i class="el-icon-user-solid"></i>
        <span> github: </span>
        <a class="github-link" href="https://github.com/ximengpy">https://github.com/ximengpy</a>
      </div>
    </div>
    <div @click="backTop" class="scrollReturn" v-show="btnFlag">
      <i class="el-icon-top"></i>
      <span>返回顶部</span>
    </div>
  </div>
</template>
<script>
import Header from './components/layout/Header'
export default {
  components:{
    Header
  },
  computed: {
    isshooHeader() {
      const notisshow = ['/','Home']
      const name = this.$route.name
      return !notisshow.includes(name)
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      btnFlag: false,
      isRouterlive: true,
      bgWidth: 0
    }
  },
  mounted() {
    addEventListener('scroll',this.scrollToTop)
    window.addEventListener('resize', this.getwindowsWidth)
    this.getwindowsWidth()
  },
  destroyed() {
    removeEventListener('scroll',this.scrollToTop)
    removeEventListener('resize', this.getwindowsWidth)
  },
  methods: {
    getwindowsWidth() {
      this.bgWidth = window.innerWidth
    },
    backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    } ,
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    reload () {
      this.isRouterlive = false
      this.$nextTick(function () {
        this.isRouterlive = true
      })
    }
  }

}
</script>


<style lang="less">
@import "assets/css/reset.css";
@import "assets/css/font.css";
html,
body {
}
#app {
  position: relative;
  & .middle-box {
    min-height: 300px;
  }
}
.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #f5f5f5;
  color: #666;
  font-size: 16px;
  text-align: center;
  & .footer-inner {
    width: 50%;
    margin: auto
  }
  .footer-inner > .link {
    color: #666;
    font-size: 14px;
    border-bottom: 1px solid #666;
  }
  .footer-inner > i {
    display: inline-block;
    margin-left: 30px;
    color: @basecolor;
    font-size: 18px;
    animation: action 2s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    @keyframes action {
      from{
        transform: scale(.8);
      }
      50%{
        transform: scale(1);
      }
      75%{
        transform: scale(.7);
      }
      100%{
        transform: scale(1);
      }
    }
  }
  .footer-inner > span {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
  .footer-inner > .github-link {
    color: #bd4147;
    background-color: #ccc;
  }
}
.scrollReturn {
  position: fixed;
  right: 30px;
  bottom: 50px;
  padding: 5px;
  background-color: #222;
  font-size: 12px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  z-index: 112;
}


.clearfix {
  &:after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
  &:before {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
}
@media screen and (max-width: 966px) {
  #app {
    & .footer {
      height: 103px;
      & .footer-inner {
        width: 100%;
      }
      & .el-icon-user-solid {}
      & .link {
        display: block;
      }
    }
  }
}
</style>
