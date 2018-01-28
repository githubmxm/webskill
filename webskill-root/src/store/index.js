import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //设备类型手机电脑判断
    wapOrPc:"pc",
    loginStatue:false
  },
  mutations:{
    setWapOrPc(state,type){
      state.wapOrPc=type;
    },
    setLoginStatue(state,boolean){
      state.loginStatue=boolean;
    }
  },
  actions:{
    setwapOrPcFn({commit},type){
      commit('setWapOrPc',type);
    },
    setLoginStatueFn({commit},boolean){
      commit('setLoginStatue',boolean);
    }
  },
  getters: {
    wapOrPc: state => {
  		return state.wapOrPc;
    },
    loginStatue: state =>{
      return state.loginStatue;
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
