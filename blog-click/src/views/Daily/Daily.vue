<template>
  <div class="show" >

    <div class="show-center">
      <h1> 个人项目</h1>
      <div class="show-wrap">
        <ul
          class="show-list"
          v-for="(item,index) in product"
          :key="index"
        >
        <li class="num"> {{index+1}}</li>
          <li
            v-html="item1"
            v-for="(item1,index1) in item"
            :key="index1"
            class="list-item"
          >
          {{item1}}
          </li>
          <li class="list-item"><a class="link-to-address" :href="link[index]" target="_blank">{{link[index]}}</a></li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
import canvass from '../../components/canvass'
export default {
  name: 'Show',
  data() {
    return {
      link: [
        'http://htmldemo.ximengpy.top/华为响应式布局/网页.html',
        'http://travel.ximengpy.top/#/',
        'http://htmldemo.ximengpy.top/小米官网/Noname1.html',
        'http://htmldemo.ximengpy.top/js/飞机大战/飞机大战1/index.html',
        'http://htmldemo.ximengpy.top'
      ],
      product:[
        [
          '华为响应式布局',
          '使用技术: html+css+flex',
          '主要用到响应式布局来分别写不同屏幕下的不同显示样式',
          '可访问地址',

        ],
        [
        '仿去哪儿网移动端',
        '使用技术: vue+vue-router+vue-vuex+flex',
        '主要用到flex弹性盒模型去布局,vue父子组件传值',
        '可访问地址:',

        ],
        [
          '小米官网pc端',
          '使用HTML+css',
          '原生HTML+css用时一周,初学前端作品',
          '可访问地址',
        ],
        [
          '原生js飞机大战',
          '使用原生HTML+CSS+Js',
          '原生javascript面向对象的思想开发游戏为一个类,',
          '可访问地址',
        ],

        [
          '初学前端学习小demo',
          '网站里面的所有内容均是原生HTML+CSS+Js所写,没有用到任何框架和插件',
          '可访问地址',
        ],

      ]
    }
  },
  components: {
    canvass
  },
  computed: {
    bgHeight() {
      return 1179
    }
  }
}
</script>
<style lang="less" >
  .show{

    position: relative;
    margin-top: 61px;
    padding-bottom: 100px;
    background-color:rgba(221,238,255,.5);
    .show-center {
      overflow: hidden;
      width: 60%;
      margin: 0 auto ;
      padding: 20px;
      background:#fff;
      animation: showin 2s;
      animation-fill-mode: forwards;
      @keyframes showin {
            from{
              opacity: 0;
            }
            to{
              opacity: 1;
            }
          }
      & > h1 {
        padding: 50px;
      }
      & > .show-wrap {
        width: 80%;
        margin: 0 auto;
        & >.show-list {
          position: relative;
          margin-bottom: 40px;
          font-size: 16px;
          color: #333;
          & > .num {
            position: absolute;
            left: -20px;
          }
          & .list-item {
            padding-top: 20px;
            padding-left: 20px;
            &:nth-child(2){
              padding-top: 40px;
              font-size: 20px;
              color: #000;
            }
            // &:nth-child(4){
            //   color: plum;
            //   cursor: pointer;

            // }
          }
          .link-to-address {
            color: plum;
            &:hover {
              color: #ccc;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 966px)  {
    .show {
      & .show-center {
        width: 82%;
      }
    }
  }
</style>
