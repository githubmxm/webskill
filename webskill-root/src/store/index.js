import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //设备类型手机电脑判断
    wapOrPc:"pc"
  },
  mutations:{
    setWapOrPc(state,type){
      state.wapOrPc=type;
    },
  },
  actions:{
    setwapOrPcFn({commit},type){
      commit('setWapOrPc',type);
    }
  },
  getters: {
    wapOrPc: state => {
  		return state.wapOrPc;
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
