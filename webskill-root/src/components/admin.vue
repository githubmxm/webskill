<!--
后台文章发表管理
-->
<template>
  <div class="conDetails row">
    <section>
      <article class="conPost clear">
        <div class="clear tabsPost left">
           <h1 class="title left">内容类型:</h1>
           <div class="words left">
            <div class="wordType">
              <input class="chooseType" readonly type="text" :value="chooseTypeName" :typeId="chooseTypeId" @click="postType()" />
              <p class="wordOne" v-show="wordOneShow">
                <!-- <span @click="chooseTypeName='最新笔录';chooseTypeId=0;wordOneShow=false">最新笔录</span> -->
                <span @click="chooseTypeName='技能快讯';chooseTypeId=1;wordOneShow=false">技能快讯</span>
                <span @click="chooseTypeName='推荐工具';chooseTypeId=2;wordOneShow=false">推荐工具</span>
                <span @click="chooseTypeName='随便说说';chooseTypeId=200;wordOneShow=false">随便说说</span>
              </p>
            </div>
           </div>
        </div>
        <div class="clear tabsPost left">
           <h1 class="title left">技能类型:</h1>
           <div class="words left">
            <div class="wordType">
              <input class="chooseType skillType" placeholder="可为空" type="text" maxlength="30" v-model="skillType" />
            </div>
           </div>
        </div>
        <div class="clear tabsPost left">
            <h1 class="title left">标签:</h1>
            <div class="words left">
             <div class="wordType">
               <input class="chooseType" readonly type="text" :value="tabTypeName" :typeId="tabTypeId" @click="tabType()" />
               <p class="wordOne" v-show="tabOneShow">
                 <!-- <span @click="chooseTypeName='最新笔录';chooseTypeId=0;wordOneShow=false">最新笔录</span> -->
                 <span @click="tabTypeName='置顶';tabTypeId=1;tabOneShow=false">置顶</span>
                 <span @click="tabTypeName='精品';tabTypeId=2;tabOneShow=false">精品</span>
                 <span @click="tabTypeName='无';tabTypeId=3;tabOneShow=false">无</span>
               </p>
             </div>
            </div>
         </div>
        <div class="clear tabsPost left">
          <h1 class="title left">标题:</h1>
          <input class="conTitle" type="text" v-model="contitle" maxlength="50"  />
        </div>
        <div class="tabsPost left">
          <span class="error">{{error}}</span>
        </div>
        <div class="details left clear">
          <div class="editor-container">
            <UE :config=config :id=ue3 ref="ue3"></UE>
          </div>
          <div class="buttonEror clear">
              <router-link v-show="viewNewPost"  class="submitResult" :to="'/previewpost/'+subPostId" target="_blank">提交成功,点击阅览,确认发布</router-link>
              <span class="leaveWordSubmit" @click="postArticle()">发布</span>
          </div>
         
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
  data () {
    return {
        chooseTypeName:'',
        chooseTypeId:'',
        skillType:'',
        wordOneShow:false,
        error:'',
        contitle:"",
        tabTypeName:"",
        tabTypeId:"",
        tabOneShow:"",
        subPostId:0,
        viewNewPost:false,
        config: {
          initialFrameWidth: null,
          //focus时自动清空初始化时的内容
          autoClearinitialContent:true,
          maximumWords:100000,
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
      this.$axios.get(tyApi().webSkillAdmin,{}).then((res) => {
      let userState = res.data
      if (userState.status == "failed") {
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
        this.tabOneShow=false;
        this.wordOneShow=!this.wordOneShow;
      },
      tabType(){
        this.wordOneShow=false;
        this.tabOneShow=!this.tabOneShow;
      },
      postArticle(){
        this.error="";
        let _this=this;
        let ueCon=this.$refs.ue3.getUEContent();
        if(this.chooseTypeId===""){
          this.error='请选择内容类型';
          return false;
        }
        if(this.tabTypeName===""){
          this.error='请选择内容标签';
          return false;
        }
        if(!this.contitle){
          this.error='请输入内容标题';
          return false;
        }
        if(!ueCon||ueCon=='<p id="initContent"><span style="color:#ccc; onlyRed">在此输入发布内容...</span></p>'){
          this.error='内容不能为空';
          return false;
        }
        // if(ueCon.length>10000){
        //   this.error='文章发布不能大于5000个';
        //   return false;
        // }
        this.$axios.post(tyApi().posts,{
             contitle:_this.contitle,
            contskilltype:_this.skillType.toLocaleLowerCase(),
            contype:_this.chooseTypeId,
            contlabel:_this.tabTypeName,
            conConts:ueCon
        }).then((res)=>{
          let resData=res.data;
          if(resData.status=="success"){
            //提交成功,等待审核
            _this.subPostId=resData.data.postId;
            _this.viewNewPost=true;
          }else{
              _this.viewNewPost=false;
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
      .tabsPost{
        display: inline-block;
        margin-right: 10px;
      }
      .title{
        margin-bottom: .3rem;
        font-weight: bold;
        font-size: .18rem;
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
      .words{
        position: relative;
        margin-top: -5px;
      }
      .wordType{
        cursor: pointer;
        left: 264px;
        float: left;
        margin-left:10px;
        width: 85px;
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
        .skillType{
          text-align: left;
          cursor: initial;
          padding-left: .1rem;
        }
        .wordOne{
          position: absolute;
          z-index: 9999;
          border:1px solid #ccc;
          background: #fff;
          span{
            display: inline-block;
            width:85px;
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
        font-size: .14rem;
      }
      .details{
        width:100%;
        .buttonEror{
          display: inline-block;
          margin-top:20px;
          float: right;
          .submitResult{
            float: left;
            display: inline-block;
            position: relative;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            text-align: center;
            background: blueviolet;
            color: #fff;
            cursor: pointer;
            &:hover{
              background: black;
            }
          }
        }
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
    width: 50px;
    display: inline-block;
    text-align: center;
    background: #5d9fec;
    color: #fff;
    float: right;
    margin-top: 10px;
    cursor: pointer;
    padding: 3px 13px;
    border-radius: 3px;
      cursor:pointer;
      &:hover{
        background: black;
      }
    }
  }
}
</style>
