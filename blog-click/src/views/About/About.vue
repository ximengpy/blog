<template>
  <div class="about" :style="'height: '+bgHeight+ 'px'">

    <canvass />
    <div class="about-center">
      <div class="about-me-1">
        <h2>关于我</h2>
        <ul class="list">
          <li v-for="(item,index) in about1" :key="index">{{item}}</li>
        </ul>
        <img src="../../assets/images/core.png" alt="">
      </div>
      <div class="about-me-2">
          <h2>关于本站</h2>
          <div class="content">
            <p>本站建于2020.5,用于记录学习前端遇到的各种bug,解决方案以及学习感悟</p>
            <p class="ele">本站结构</p>
            <p class="ele-1">前端: <span>h5+css3+js+vue+element</span></p>
            <p class="ele-2">后端: <span>Node + MongoDB</span></p>
            <p>本站采用阿里云服务器ESC</p>
          </div>
      </div>
      <div class="about-me-3">
        <h2>特别说明</h2>
        <p>本站文章仅代表个人观点，和任何组织或个人无关</p>
        <p>用户邮箱仅作回复消息用，不对外使用。</p>
      </div>
    </div>
  </div>
</template>
<script>
import canvass from '../../components/canvass'
export default {
  name: 'About',
  data() {
    return {
      about1:[
        '职业: web前端',
        '现居地: 广州市天河区',
        '联系方式:  ',
        'qq: 1580559335',
        '微信: py1580559335',
        '邮箱: 1580559335@qq.com',
        '扫描下方二维码添加微信'
      ],
    }
  },
  components: {
    canvass
  },
  computed: {
    bgHeight() {

      return 1333
    }
  }
}
</script>
<style lang="less" >
  .about{
    position: relative;
    background-color:rgba(221,238,255,.5);
    .about-center {
      position:relative;
      top: 90px;
      overflow: hidden;
      width: 60%;
      margin: 0 auto 0;
      background:#fff;
      animation: show 2s;
      animation-fill-mode: forwards;
      @keyframes show {
            from{
              opacity: 0;
            }
            to{
              opacity: 1;
            }
          }
      & .about-me-1,& .about-me-2,& .about-me-3 {
        margin-bottom: 30px;
        padding-left: 30px;
        & h2 {
          margin-top: 20px;
          margin-bottom: 30px;
          width: 95%;
          height: 40px;
          line-height: 40px;
          padding-left: 8px;
          font-size: 25px;
          font-weight: 600;
          background-color: rgba(224,228,227,.5);
          border-left: 8px solid @objectcolor;
        }
      }
      & .about-me-1 {
        & > .list {
          li {
            .about-me();
            &:nth-child(3){
              color: @basecolor;
            }
          }
        }
        & > img {
          .about-me();
          display: inline-block;
          width: 20%;
        }
      }
      & .about-me-2 {
        & > .content {
          & >p {
            .about-me();
            color: #333;
            > span {
              display: inline-block;
              padding: 5px;
              color: #bd4147;
              background-color: rgba(27,31,35,.05);
              font-size: 12px;
            }
          }
        }
      }
      & .about-me-3 {
        & > p {
          .about-me();
        }
      }
    }
  }
  @media screen and (max-width: 966px)  {
    .about {
      & .about-center {
        width: 90%;
      }
    }
  }
</style>
