<template>
  <div class="conDetails row">
    <section>
      <article class="conPost clear">
        <div class="conlists left">
            <h1 class="title left">发表类型:</h1>
            <div class="leaves">
              <div class="wordType">
                  <input class="chooseType" readonly type="text" :value="chooseTypeName" :typeId="chooseTypeId" @click="wordOneShowFn()" />
                  <p class="wordOne" v-show="wordOneShow">
                    <span @click="chooseTypeName='私密';chooseTypeId=0;wordOneShow=false">私密</span>
                    <span @click="chooseTypeName='提BUG';chooseTypeId=1;wordOneShow=false">提BUG</span>
                    <span @click="chooseTypeName='提建议';chooseTypeId=2;wordOneShow=false">提建议</span>
                    <span @click="chooseTypeName='技能寻解答';chooseTypeId=3;wordOneShow=false">技能寻解答</span>
                  </p>
              </div>
            </div>
        </div>
        <div class="conlists left">
            <h1 class="title left leavesTitle">标题:</h1>
            <div class="leaves">
              <div class="wordType">
                  <input class="chooseType leaveWordTitle" type="text" v-model="leaveWordTitles" />
              </div>
            </div>
        </div>
             <div class="conlists left"  v-if="vcodeShow">
            <div class="leaves">
              <div class="wordType">
                   <input type="text" v-model="inCode" id="vcode" placeholder="请输入验证码" maxlength="6" />
              <span class="imgCode" @click="refreshVcode()" v-html="vcode"></span>
              </div>
            </div>
        </div>
       
        <div class="details left clear">
          <div class="editor-container">
            <UE :config=config :id=ue2 ref="ue2"></UE>
          </div>
          <span class="error">{{error}}</span>
          <span class="leaveWordSubmit" @click="leaveWordSubmitFn()">提交</span>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UE from './ue/ue'
import {
    tyApi
  } from "@/apis/api";
export default {
  name:'leaveword',
  data () {
    return {
        chooseTypeName:'',
        chooseTypeId:'',
        wordOneShow:false,
        leaveWordTitles:'',
         vcode:"",
        inCode:"",
        vcodeShow:false,
        error:'',
        config: {
          initialFrameWidth: null,
          //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
          toolbars:[['test','emotion']],
          //focus时自动清空初始化时的内容
          autoClearinitialContent:true,
          maximumWords:300,
          pasteplain:true,
          initialContent:'<span style="color:#ccc; onlyRed">在此输入发表内容...</span>',
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
      refreshVcode:function(){
        this.getVcode();
      },
      getVcode:function(){
      let _this=this;
      _this.$axios.get(tyApi().vcode,{r:Math.random()}).then((res) => {
          if(res.data.status=="incorrect-authen"){
            _this.vcode='验证码'
             this.error='操作异常';
          }else{
              _this.vcode=res.data;
          }
          
      })
    },
      leaveWordSubmitFn(){
        let _this=this;
        let ueCon=this.$refs.ue2.getUEContent();
        if(!this.chooseTypeName){
          this.error='请选择发表类型';
          return false;
        }
        if(!ueCon||ueCon=='<p id="initContent"><span style="color:#ccc; onlyRed">在此输入发表内容...</span></p>'){
          this.error='发表内容不能为空';
          return false;
        }
        if(ueCon.length<10){
          this.error='发表内容不能少于10个字';
          return false;
        }
        if(ueCon.length>300){
          this.error='留言字数过长';
          return false;
        }
        this.error="";
        _this.$axios.post(tyApi().leaveWord,{
            leaveWordType:_this.chooseTypeId,
            leaveWordCon:ueCon,
            leaveWordTitle:_this.leaveWordTitles,
            vcode:_this.inCode
          }).then((res)=>{
          let resData=res.data;
          if(resData.status=="incorrect-login"){
            _this.setLoginStatueFn(false);
          }
          if(resData.status=="success"){
            setTimeout(function(){
              _this.setAalertMsgFn("感谢您的发表！")
              location.href="/index";
            },3000);
          }else{
            if(resData.status=="code-error"){
                _this.vcodeShow=true;
                _this.inCode="";
                _this.refreshVcode();
            }
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
      #vcode{
                   display: inline-block;
    width: 160px;
    border: 1px solid #cdc5c5;
    padding: 5px;
    position: relative;
    top: -8px;
    height: 30px;
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
      .leavesTitle{
        margin-left:18px;
        
      }
      .leaveWordTitle{
          width:200px !important;
          text-align: left !important;
          padding: 0 8px;
          cursor: auto !important;
        }
      .wordType{
        cursor: pointer;
        left: 264px;
        float: left;
        margin-left: 10px;
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
        margin-top: 10px;
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
      &:hover{
        background: #a876d6;
      }
    }
  }
}
</style>
