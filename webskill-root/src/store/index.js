import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    historyLength: 0
  },
  mutations: {
    updateHistoryLength(state) {
      state.historyLength++;
    }
  }
})
