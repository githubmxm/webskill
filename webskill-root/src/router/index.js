import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Index from '@/components'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  hashbang: false, // 将路径格式化为#!开头
  history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  routes: [{
    path: '/',
    name: 'Index',
    components: {
      default: Index
    },
    children: [{
      path: '/'
    }]
  }]
})

/**
 * desc:全局监听
 */
router.beforeEach((to, from, next) => {
  Store.dispatch('updateHistoryLength')
  next()
})

export default router
