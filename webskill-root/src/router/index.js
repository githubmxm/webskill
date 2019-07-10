import Router from 'vue-router'
// import NProgress from '../../static/js/nprogress.js'


// Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  hashbang: false, // 将路径格式化为#!开头
  history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  routes: [{
    path: '/login',
    name: 'login',
    component:  resolve => require(['@/components/login'], resolve)
  },{
    path: '/bindAccount',
    name: 'bindAccount',
    component:  resolve => require(['@/components/bindAccount'], resolve)
  },{
    path: '/',
    redirect:'/index'
  },{
    path:'/index',
    name:'index',
    component:  resolve => require(['@/components'], resolve)
  },{
    path:'/findpassword',
    name:'findpassword',
    component:  resolve => require(['@/components/findpassword'], resolve)
  },{
    path:'/articlelist/:skilltype',
    name:'articlelist',
    component:  resolve => require(['@/components/articlelist'], resolve)
  },{
    path:'/cooperation',
    name:'cooperation',
    component:  resolve => require(['@/components/cooperation'], resolve)
  },{
    path:'/previewpost/:id',
    name:'previewpost',
    component:  resolve => require(['@/components/post'], resolve)
  },,{
    path:'/post/:id',
    name:'post',
    component:  resolve => require(['@/components/post'], resolve)
  },{
    path:'/leaveword',
    name:'leaveword',
    component:  resolve => require(['@/components/leaveword'], resolve)
  },,{
    path:'/leaveDetail/:id',
    name:'leaveDetail',
    component:  resolve => require(['@/components/leaveDetail'], resolve)
  },{
    path:'/privacy',
    name:'privacy',
    component:  resolve => require(['@/components/privacy'], resolve)
  },{
    path:'/about',
    name:'about',
    component:  resolve => require(['@/components/about'], resolve)
  },{
    path:'/webSkillAdmin',
    name:'webSkillAdmin',
    component:  resolve => require(['@/components/admin'], resolve)
  },{
    path:'/webSkillUpload',
    name:'webSkillUpload',
    component:  resolve => require(['@/components/upload'], resolve)
  },{
    path:'/surePublish',
    name:'surePublish',
    component:  resolve => require(['@/components/surePublish'], resolve)
  },{
    path:'/admin/dataMonitor',
    name:'dataMonitor',
    component:  resolve => require(['@/components/admin/dataMonitor'], resolve)
  },{
    path:'/myResource',
    name:'myResource',
    component:  resolve => require(['@/components/myResource'], resolve)
  },{
    path:'/other/roseAnm',
    name:'roseAnm',
    component:  resolve => require(['@/components/other/roseAnm'], resolve)
  }]
})

/**
 * desc:全局监听
 */

router.beforeEach((to, from, next) => {
  //页面404处理
  NProgress.start();
  if(!to.name){
    location.href="/index";
  }
  // Store.dispatch('updateHistoryLength')
  next()
});

router.afterEach((to, from, next) => {
  NProgress.done(true);
});


export default router
