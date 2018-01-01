import Vue from 'vue'
import Vuex from 'vuex'
import HeaderStore from './headerStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    headerStore: HeaderStore
  }
})

export default store
