<template>
  <div class="conDetails row">
    <section>
      <article class="conPost clear">
        <div class="conlists left">
            <h1 class="title left">留言类型:</h1>
            <div class="leaves">
              <div class="wordType">
                  <input class="chooseType" readonly type="text" :value="chooseTypeName" :typeId="chooseTypeId" @click="wordOneShowFn()" />
                  <p class="wordOne" v-show="wordOneShow">
                    <span @click="chooseTypeName='我要私密';chooseTypeId=0;wordOneShow=false">我要私密</span>
                    <span @click="chooseTypeName='我要提BUG';chooseTypeId=1;wordOneShow=false">我要提BUG</span>
                    <span @click="chooseTypeName='我要提建议';chooseTypeId=2;wordOneShow=false">我要提建议</span>
                    <span @click="chooseTypeName='随便说说';chooseTypeId=3;wordOneShow=false">随便说说</span>
                  </p>
              </div>
            </div>
        </div>
        <span class="error">{{error}}</span>
        <div class="details left clear">
          <div class="editor-container">
            <UE :config=config :id=ue2 ref="ue2"></UE>
          </div>
          <span class="leaveWordSubmit" @click="leaveWordSubmitFn()">提交</span>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UE from './ue/ue'
import axios from 'axios'
export default {
  data () {
    return {
        chooseTypeName:'',
        chooseTypeId:'',
        wordOneShow:false,
        error:'',
        config: {
          initialFrameWidth: null,
          //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
          toolbars:[['test','emotion']],
          //focus时自动清空初始化时的内容
          autoClearinitialContent:true,
          maximumWords:300,
          pasteplain:true,
          initialContent:'<span style="color:#ccc; onlyRed">在此输入留言...</span>',
          //关闭字数统计
          wordCount:true,
          enableAutoSave:false,
          //关闭elementPath
          elementPathEnabled:false,
          //默认的编辑区域高度
          initialFrameHeight:200
        },
        ue2: "ue2"
    }
  },
  components: {
    UE
  },
  methods: {
      ...mapActions(["setAalertMsgFn","setLoginStatueFn"]),
      wordOneShowFn(){
        this.wordOneShow=!this.wordOneShow;
      },
      leaveWordSubmitFn(){
        let _this=this;
        let ueCon=this.$refs.ue2.getUEContent();
        if(!this.chooseTypeName){
          this.error='请选择留言类型';
          return false;
        }
        if(!ueCon||ueCon=='<p id="initContent"><span style="color:#ccc; onlyRed">在此输入留言...</span></p>'){
          this.error='留言内容不能为空';
          return false;
        }
        if(ueCon.length<10){
          this.error='留言不能少于10个';
          return false;
        }
        axios({
          method:'post',
          url:'/webskill/leaveWord',
          data:{
            leaveWordType:_this.chooseTypeId,
            leaveWordCon:ueCon
          }
        }).then((res)=>{
          let resData=res.data;
          if(resData.status=="incorrect-login"){
            _this.setLoginStatueFn(false);
          }
          if(resData.status=="success"){
            //提交成功,等待审核
            _this.setAalertMsgFn("感谢您的留言！")
            location.href="/index";
          }else{
            this.error=resData.message;
            return false;
          }

        }).catch((err)=>{

        });
      }
  }
}
</script>

<style lang="scss" scoped>
.conDetails{
  background: #fcfcfa;
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
  section{
    .conPost{
      position: relative;
      padding: 30px;
      .conlists{
        display: inline-block;
      }
      .title{
        margin-bottom: .3rem;
        font-weight: bold;
        font-size: .18rem;
        font-family: Pmingliu,Mingliu;
      }
      .leaves{
        position: relative;
        float: left;
        margin-top: -7px;
      }
      .wordType{
        cursor: pointer;
        left: 264px;
        float: left;
        margin-left: 10px;
        width: 80px;
        line-height: 30px;
        color: #fff;
        .chooseType{
          cursor: pointer;
          width: 100%;
          border: 0 none;
          outline: 0;
          text-align:center;
          border: 1px solid #ccc;
          height: 30px;
          line-height: 30px;
        }
        .wordOne{
          position: absolute;
          z-index: 9999;
          border:1px solid #ccc;
          background: #fff;
          span{
            display: inline-block;
            width:100%;
            text-align:center;
            border-bottom:1px solid #ccc;
            &:hover{
              background: rgb(213, 227, 239);
            }
          }
        }
      }
      .error{
        color: red;
        font-size: .14rem;
        margin-left: 5px;
        margin-top: -10px;
        display: inline-block;
      }
      .details{
        width:100%;
      }
      .meta{
        margin-top: 10px;
        margin-bottom: 15px;
        color: #777;
        font-size: 10px;
        .creatTime{
          margin-bottom: 15px;
          color: #777;
          font-size: 10px;
        }
        .pageViewNum{
          margin-left: 30px;
        }
      }
    }
    .leaveWordSubmit{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 50px;
      text-align: center;
      background: blueviolet;
      color: #fff;
      float: right;
      margin-top: 20px;
      cursor:pointer;
    }
  }
}
</style>
