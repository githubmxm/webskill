<!--
留言详情
-->
<template>
  <div class="conDetails">
      <p class="error" v-if="showError">{{errorMsg}}</p>
      <p>留言人:{{leaveDCons.leaveAuthor}}</p>
      <p>标题:{{leaveDCons.leaveTitle}}</p>
      <p>留言时间:{{leaveDCons.leaveTime|createTime}}</p>
      <p>留言类型:{{leaveDCons.leaveType|leaveType}}</p>
      <p>留言内容:</p>
      <p v-html="leaveDCons.leaveConts"></p>
      <p class="del" @click="delLeave()">删除</p>
  </div>
</template>

<script>
import {
    tyApi
  } from "@/apis/api";
  import FormatDataTime from '../tool/formatDataTime';
export default {
  data () {
    return {
        showError:false,
        errorMsg:"",
        leaveId:parseInt(this.$route.params.id),
        leaveDCons:""
    }
  },
  components: {
    
  },
  filters: {
     createTime:function(t){
         return FormatDataTime(t);
     },
     leaveType:function(type){
         if(type==0){
            return '私信';
         }
         if(type==1){
             return 'BUG';
         }
         if(type==2){
             return '建议';
         }
         if(type==3){
             return '技能求解答';
         }
     }
  },
  methods:{
      getLeaveDetail(){
        let _this=this;
        _this.$axios.get(tyApi().leavewordDetail,{r:Math.random(),leaveId:_this.leaveId}).then((res) => {
            if(res.data.status=="success"){
                _this.leaveDCons=res.data.data;
            }else{
                _this.errorMsg=res.data.message;
                _this.showError=true;
            }
        })
      },
      delLeave(){
         let _this=this;
         _this.errorMsg="";
        _this.showError=false;
        _this.$axios.post(tyApi().deleteLeave,{leaveId:_this.leaveId}).then((res) => {
            if(res.data.status=="success"){
               location.href="/surePublish";
            }else{
                 _this.errorMsg=res.data.message;
                _this.showError=true;
            }
        }) 
      }
  },
  computed: {
   
  },
  mounted () {
    this.getLeaveDetail()
  }
}
</script>

<style lang="scss" scoped>
.conDetails{
    p{
        font-size: 16px;
        margin: 8px 5px;
    }
    .del{
        display: block;
        text-align: center;
        background: #5d9fec;
        color: #fff;
        margin-top: 20px;
        cursor: pointer;
        padding: 3px 13px;
        border-radius: 3px;
        &:hover{
          background: #a876d6;
        }
    }
}
</style>
