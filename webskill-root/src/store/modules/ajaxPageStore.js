export default{
  state:{
    //首页列表-最新笔录....推荐工具
    dynamicDataList:[]
  },
  mutations:{
    setDynamicDataList(state,list){
      state.dynamicDataList=list;
    },
  },
  actions:{
    setDynamicDataListFn({commit},list){
      commit('setDynamicDataList',list);
    }
  },
  getters: {
    dynamicDataList: state => {
  		return state.dynamicDataList;
    }
  }
}