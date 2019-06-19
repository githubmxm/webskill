export default{
  state:{
    //首页列表-最新笔录....推荐工具
    dynamicDataList:[],
    //技能类型列表
    skillListDetail:[],
    //待确认发布文章列表
    publishListDetail:[],
    //我的资源下载
    getMyResource:[]
  },
  mutations:{
    setDynamicDataList(state,list){
      state.dynamicDataList=list;
    },
    setSkillListDetail(state,list){
      state.skillListDetail=list;
    },
    setPublishListDetail(state,list){
      state.publishListDetail=list;
    },
    setGetMyResource(state,list){
      state.getMyResource=list;
    }
  },
  actions:{
    setDynamicDataListFn({commit},list){
      commit('setDynamicDataList',list);
    },
    setSkillListDetailFn({commit},list){
      commit('setSkillListDetail',list);
    },
    setPublishListFn({commit},list){
      commit('setPublishListDetail',list);
    },
    setGetMyResourceFn({commit},list){
      commit('setGetMyResource',list);
    }
  },
  getters: {
    dynamicDataList: state => {
  		return state.dynamicDataList;
    },
    skillListDetail: state => {
  		return state.skillListDetail;
    },
    publishListDetail: state => {
  		return state.publishListDetail;
    },
    getMyResource: state => {
  		return state.getMyResource;
    }
  }
}