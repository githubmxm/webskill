import Vue from 'vue'
import Vuex from 'vuex'
import HeaderStore from './headerStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
   HeaderStore
  }
})
