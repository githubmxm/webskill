import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //设备类型手机电脑判断
    wapOrPc:"pc",
    loginStatue:false,
    loginUser:""
  },
  mutations:{
    setWapOrPc(state,type){
      state.wapOrPc=type;
    },
    setLoginStatue(state,boolean){
      state.loginStatue=boolean;
    },
    setLoginUser(state,user){
      state.loginUser=user;
    }
  },
  actions:{
    setwapOrPcFn({commit},type){
      commit('setWapOrPc',type);
    },
    setLoginStatueFn({commit},boolean){
      commit('setLoginStatue',boolean);
    },
    setLoginUserFn({commit},user){
      commit('setLoginUser',user);
    }
  },
  getters: {
    wapOrPc: state => {
  		return state.wapOrPc;
    },
    loginStatue: state =>{
      return state.loginStatue;
    },
    loginUser: state =>{
      return state.loginUser;
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
