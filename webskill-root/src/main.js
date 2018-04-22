// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import animate from 'animate.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import App from './App'
import store from './store/index'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import Mock from 'mockjs'
import 'babel-polyfill'
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
import '../static/css/nprogress.css'
import NProgress from '../static/js/nprogress.js'

Vue.use(animate)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
