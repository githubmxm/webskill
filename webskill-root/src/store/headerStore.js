import axios from 'axios'

export default {
  state: {
    //主导航和二级导航
    mainNavs: []
  },
  mutations: {
    setNav(state, nav) {
      state.mainNavs = nav;
    }
  },
  actions: {
    getNav({
      commit
    }, url) {
      axios({
        method: 'get',
        url: url
      }).then((res) => {
        let nav = res.data
        if (nav.status == "success") {
          commit('setNav', nav.data)
        }
      })
    }
  }
}
