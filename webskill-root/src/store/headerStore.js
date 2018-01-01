import axios from 'axios'

const headerStore={
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
        method:get,
        url:url
      }).then((res)=>{
         console.log(res)
         let data=res.data.data
         commit('setNavs',data)
      })
    }
  }
}

export default headerStore