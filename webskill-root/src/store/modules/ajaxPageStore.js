export default{
  state:{
    //首页列表-最新笔录....推荐工具
    dynamicDataList:[],
    //技能类型列表
    skillListDetail:[]
  },
  mutations:{
    setDynamicDataList(state,list){
      state.dynamicDataList=list;
    },
    setSkillListDetail(state,list){
      state.skillListDetail=list;
    },
  },
  actions:{
    setDynamicDataListFn({commit},list){
      commit('setDynamicDataList',list);
    },
    setSkillListDetailFn({commit},list){
      commit('setSkillListDetail',list);
    }
  },
  getters: {
    dynamicDataList: state => {
  		return state.dynamicDataList;
    },
    skillListDetail: state => {
  		return state.skillListDetail;
    }
    
  }
}