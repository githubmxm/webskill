<!--
后台文章发表管理
-->
<template>
  <div class="conDetails row">
    <section>
      <article class="conPost clear">
        <div class="clear">
           <h1 class="title left">请选择您要发表的内容类型:</h1>
           <div class="left">
            <div class="wordType">
              <input class="chooseType" readonly type="text" :value="chooseTypeName" :typeId="chooseTypeId" @click="postType()" />
              <p class="wordOne" v-show="wordOneShow">
                <span @click="chooseTypeName='最新笔录';chooseTypeId=0;wordOneShow=false">最新笔录</span>
                <span @click="chooseTypeName='技能快讯';chooseTypeId=1;wordOneShow=false">技能快讯</span>
                <span @click="chooseTypeName='推荐工具';chooseTypeId=2;wordOneShow=false">推荐工具</span>
              </p>
            </div>
           </div>
        </div>
        <div class="clear">
          <h1 class="title left">标题:</h1>
          <input class="conTitle" type="text" v-model="contitle" maxlength="50"  />
        </div>
        <div>
          <span class="error">{{error}}</span>
        </div>
        <div class="details left clear">
          <div class="editor-container">
            <UE :config=config :id=ue3 ref="ue3"></UE>
          </div>
          <span class="leaveWordSubmit" @click="postArticle()">发布</span>
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
        contitle:"",
        config: {
          initialFrameWidth: null,
          //focus时自动清空初始化时的内容
          autoClearinitialContent:true,
          maximumWords:5000,
          pasteplain:true,
          initialContent:'<span style="color:#ccc; onlyRed">在此输入发布内容...</span>',
          //关闭字数统计
          wordCount:true,
          enableAutoSave:false,
          //关闭elementPath
          elementPathEnabled:false,
          //默认的编辑区域高度
          initialFrameHeight:200
        },
        ue3: "ue3"
    }
  },
  created () {
    axios({
      method: 'get',
      url: '/webskill/webSkillAdmin'
    }).then((res) => {
      let userState = res.data
      if (userState.message == "权限认证失败") {
        location.href="/index";
      }
    }).catch(function(error){
      location.href="/index";
    })
  },
  components: {
    UE
  },
  methods: {
      ...mapActions(["setAalertMsgFn"]),
      postType(){
        this.wordOneShow=!this.wordOneShow;
      },
      postArticle(){
        this.error="";
        let _this=this;
        let ueCon=this.$refs.ue3.getUEContent();
        if(this.chooseTypeId===""){
          console.log(100)
          this.error='请选择发布内容类型';
          return false;
        }
        if(!this.contitle){
          console.log(100)
          this.error='请输入内容标题';
          return false;
        }
        if(!ueCon||ueCon=='<p id="initContent"><span style="color:#ccc; onlyRed">在此输入发布内容...</span></p>'){
          this.error='发布内容不能为空';
          return false;
        }
        if(ueCon.length>5000){
          this.error='文章发布不能大于5000个';
          return false;
        }
        axios({
          method: 'post',
          url:'/webskill/posts',
          data:{
            contitle:_this.contitle, 
            contype:_this.chooseTypeId,
            conConts:ueCon
          }
        }).then((res)=>{
          let resData=res.data;
          if(resData.message=="文章发表成功"){
            //提交成功,等待审核
            location.href="/index"
          }else{
              _this.error=resData.message;
          }
        }).catch((err)=>{
           _this.error="发表异常";
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
      .title{
        margin-bottom: 15px;
        font-weight: bold;
        font-size: 18px;
        font-family: Pmingliu,Mingliu;
      }
      .conTitle{
        width: 264px;
        outline: 0;
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        padding-left: 8px;
        margin-top: -4px;
        margin-left: 8px;
      }
      .wordType{
        position: absolute;
        cursor: pointer;
        left: 264px;
        float: left;
        width: 80px;
        line-height: 30px;
        color: #fff;
        top: 24px;
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
         display: block;
        margin-bottom: 10px;
        color: red;
        font-size: 14px;
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
