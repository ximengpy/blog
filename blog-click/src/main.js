import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import love from './js/love'
import nprogress from 'nprogress' //进度条
import 'nprogress/nprogress.css'  //进度条


import heghtjs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(heghtjs)                                //代码高亮显示

Vue.use(ElementUI)
    .use(VueParticles)
    .use(love)
Vue.config.productionTip = false
router.beforeEach((to, from, next)=> {
  nprogress.start()
  next()
})
router.afterEach((to, from)=> {
  nprogress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('heghtjs', el => {
  let blocks = el.querySelectorAll('pre code');
  Array.prototype.forEach.call(blocks, heghtjs.highlightBlock);
});

