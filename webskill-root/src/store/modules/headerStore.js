import axios from 'axios'

export default {
  state: {
    //主导航和二级导航
    mainNavs: [],
    //用户登录状态,默认false未登录
    isLogin: false
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
    },
    //获取用户登录状态
    getLoginState({
      commit
    }) {
      axios({
        method: 'get',
        url: '/static/userState.json'
      }).then((res) => {
        let userState = res.data
        if (userState.status == "success") {
          commit('setIsLogin', userState.data.loginStatue)
        }
      })
    }
  },
  getters: {
  	mainNavs: state => {
  		return state.mainNavs;
    },
    isLogin: state => {
  		return state.isLogin;
  	}
  },
}
