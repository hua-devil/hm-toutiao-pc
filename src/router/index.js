import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页面
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/image', component: Image }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断如果是除去登录页面外其他的路由，且没有登录，拦截到登录
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
