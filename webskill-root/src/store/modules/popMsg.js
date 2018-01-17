export default{
  state:{
    //弹层提示内容
    alertMsg:'敬请期待!',
    alertMsgShow:false,
    maskZzShow:false
  },
  mutations:{
    setAalertMsg(state,msg){
      if(msg){
        state.alertMsg=msg;
       
      }else{
        state.alertMsg='敬请期待!';
      }
      state.alertMsgShow=true;
      state.maskZzShow=true;
    },
    setAalertMsgHide(state){
      state.alertMsgShow=false;
      state.maskZzShow=false;
    }
  },
  actions:{
    setAalertMsgFn({commit},msg){
      commit('setAalertMsg',msg);
    },
    setAalertMsgHideFn({commit}){
      commit('setAalertMsgHide');
    }
  },
  getters: {
    alertMsg: state => {
  		return state.alertMsg;
    },
    alertMsgShow: state => {
  		return state.alertMsgShow;
    },
    maskZzShow: state => {
      return state.maskZzShow;
    }
  }
}