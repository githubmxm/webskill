// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import animate from 'animate.css'
// import 'vue2-animate/dist/vue2-animate.min.css'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import uploader from 'vue-simple-uploader'
import App from './App'
import Axios from './tool/ajaxAxios'
import store from './store/index'
import {sync} from 'vuex-router-sync'
import router from './router'
// import 'font-awesome/css/font-awesome.min.css'
import 'babel-polyfill'
// import '../static/css/nprogress.css'
// import '../static/css/iconfont.css'

// Vue.use(animate)
// Vue.use(VueAwesomeSwiper)
Vue.use(uploader)
Vue.config.productionTip = false

//全局引用
Vue.prototype.$axios = Axios; 

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
