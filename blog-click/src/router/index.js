import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/blog/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/blog/register.vue')
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About/About.vue')
  },
  {
    path: '/dialy',
    name: 'Dialy',
    component: () => import('../views/Dialy/Dialy.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('../views/Blog/Blog.vue')
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('../views/Work/Work.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message/Message.vue')
  },
  {
    path: '/links',
    name: 'Links',
    component: () => import('../views/Links/index.vue')
  },
  {
    path: '/article/:id',
    name: 'Detail',
    component:() => import('../views/Blog/components/index.vue')
  },
  {
    path: '*',
    name: '404',
    component:() => import('../components/error.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
