import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Index from '@/components'
import Post from '@/components/post'
import Privacy from '@/components/privacy'
import Login from '@/components/login'
import Leaveword from '@/components/leaveword'
import Admin from '@/components/admin'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  hashbang: false, // 将路径格式化为#!开头
  history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  routes: [{
    path: '/login',
    name: 'login',
    components: {
      default: Login,
    }
  },{
    path: '/',
    redirect:'/index'
  },{
    path:'/index',
    name:'index',
    components:{
      default: Index
    }
  },{
    path:'/post',
    name:'post',
    components:{
      default: Post
    }
  },{
    path:'/leaveword',
    name:'leaveword',
    components:{
      default: Leaveword
    }
  },{
    path:'/privacy',
    name:'privacy',
    components:{
      default: Privacy
    }
  },{
    path:'/webSkillAdmin',
    name:'webSkillAdmin',
    components:{
      default: Admin
    }
  }]
})

/**
 * desc:全局监听
 */
router.beforeEach((to, from, next) => {
  //页面404处理
  if(!to.name){
    location.href="/index";
  }
  // Store.dispatch('updateHistoryLength')
  next()
})

export default router
