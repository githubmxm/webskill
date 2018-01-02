import axios from 'axios'

export default {
  state: {
    //页签
    navT:[]
  },
  mutations: {
    setNav(state,navs){
       state.navT=navs;
    }
  },
  actions: {
    getNav({commit},url){
      axios({
        method:'get',
        url:url
      }).then((res)=>{
         let data=res.data.data
         commit('setNav',data)
      })
    }
  }
}