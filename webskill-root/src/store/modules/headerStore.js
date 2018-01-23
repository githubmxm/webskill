import axios from 'axios'

export default {
  state: {
    //主导航和二级导航
    mainNavs: []
  },
  mutations: {
    setNav(state, nav) {
      state.mainNavs = nav;
    },
    setIsLogin(state,userState){
      state.isLogin = userState;
    }
  },
  actions: {
    //获取导航列表
    getNav({
      commit
    }) {
      axios({
        method: 'get',
        url: '/static/headJson.json'
      }).then((res) => {
        let nav = res.data
        if (nav.status == "success") {
          commit('setNav', nav.data)
        }
      })
    }
  },
  getters: {
  	mainNavs: state => {
  		return state.mainNavs;
    }
  },
}
