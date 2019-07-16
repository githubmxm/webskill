<!--
公用头部导航
-->
<template>
  <header class="top container-fluid">
    <nav class="topType container">
      <p class="alinks clear col-lg-5 col-xs-9">
        <a title="技百讯" class="logo col-xs-2" href="/index">
          <span>JBX</span>
        </a>
        <a class="indexView col-xs-2" :class="{cur:navUrl=='/index'}" href="/index" title="首页">首页</a>
        <a class="myNotesView col-xs-2" :class="{cur:navUrl=='/articlelist/all'}" title="技能摘要" href="/articlelist/all">技库</a>
        <!-- <a class="newTitleView col-xs-2" title="技能快讯" @click="setAalertMsgFn()">资讯</a> -->
        <a class="coTitleView col-xs-2" :class="{cur:navUrl=='/cooperation'}" title="商务合作" href="/cooperation">合作</a>
      </p>
      <!--用户已登录-->
      <p class="userLogin  col-lg-2 right" v-if="loginStatue" @mouseleave="listHide()">
        <span class="pull-right">
            <span class="userInfo left" @mouseover="listShow()">{{username}}</span>
            <i class="icon iconfont icon-xiaosanjiaodown"></i>
        </span>
        <ul class="infoList" v-show="showInfoList">
          <li  v-for="(nav,index) in navs" :key="index">
              <i class="icon iconfont" :class="nav.navIcon"></i>
              <a class="surePublish" :href="nav.navUrl">{{nav.navName}}</a>
          </li>
          <li v-if="myPostInfoShow">
              <i class="icon iconfont icon-kaitongzhong chuliIconStyle"></i>
              <a class="surePublish" href="javascript:void(0)"  @click="openUse()">开通使用</a>
          </li>
          <li>
              <i class="icon iconfont icon-tuichu"></i>
              <a class="surePublish" href="javascript:void(0)"  @click="loginExit()">退出登录</a>
          </li>
        </ul>
      </p>
      <!--未登录或异常-->
      <div class="noLogin col-lg-1 right" v-else>
        <p>
          <a href="/login" class="goLogin">登录</a>
        </p>
      </div>
    </nav>
  </header>
</template>

<script>
import {
    tyApi
  } from "@/apis/api";
import { mapActions,mapGetters } from "vuex";
import { setInterval } from 'timers';

export default {
  name: "top",
  data() {
    return {
      msg: "主导航和二级导航展示",
      jbx: true,
      username:"",
      navs:[],
      navUrl:this.$route.path,
      noReadNum:0, //未读消息条数
      showInfoList:false,
      myPostInfoShow:false
    };
  },
  created() {
      let _this=this;
    //   _this.getToken();
     _this.loginStatus();
  },
  computed: {
    ...mapGetters(['loginStatue'])
  },
  methods: {
    ...mapActions(['setAalertMsgFn','setLoginStatueFn','setLoginUserFn','setUserGradeFn']),
    openUse(){
        let _this=this;
        _this.$axios.post(tyApi().openUse,{}).then((res) => {
        let d = res.data
        if (d.status == "success") {
          localStorage.clear();
          location.href="/index";
        }
      })
    },
    loginExit(){
      let _this=this;
      _this.$axios.post(tyApi().loginExit,{}).then((res) => {
        let userState = res.data
        if (userState.status == "success") {
            localStorage.setItem("webskillloginstatus",0);
          _this.setLoginStatueFn(false)
          _this.username="";
          _this.setLoginUserFn(_this.username);
        }
      })
    },
    getNoReadMsg(){
      let _this=this;
      _this.$axios.get(tyApi().getNoReadMsg,{r:Math.random()}).then((res) => {
        let d = res.data
        if (d.status == "success") {
            _this.noReadNum=d.data;
        }
      })
    },
    loginStatus(){
        let _this=this;
      _this.$axios.get(tyApi().loginStatus,{}).then((res) => {
      let userState = res.data;
      if (userState.status == "success") {
        setInterval(function(){
            _this.getNoReadMsg()
        },3000);
        localStorage.setItem("webskillloginstatus",1)
        _this.setLoginStatueFn(true);
        _this.username=userState.data.userName;
        if(userState.data.userGrade==3){
          _this.myPostInfoShow=true;
        }
         _this.setUserGradeFn(userState.data.userGrade);
        _this.setLoginUserFn(_this.username);
      }else{
        localStorage.setItem("webskillloginstatus",0);
        _this.setLoginStatueFn(false);
        _this.setUserGradeFn(0);
        _this.setLoginUserFn("");
      }
    })
    },
    getNavs(){
        let _this=this;
        _this.$axios.get(tyApi().getNavs,{}).then((res) => {
          _this.navs=res.data.data;
        })
    },

    listShow(){
      this.showInfoList=true;

    },
    listHide(){
      this.showInfoList=false;
    }
  },
  mounted: function() {
    let _this=this;
    _this.getNavs();
  }
 
};
</script>

<style lang="scss" scoped>
@import "../assets/css/minxin";
@import '../assets/css/animation';
.top{
  min-width: 360px;
  background: #fff;
  padding: 0 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  border-top: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  background-color: #fbfbfb;
  .icon-xiaosanjiaodown{
      color: #ccc;
  }
  .topType{
  line-height: 50px;
  font-size: .14rem;
  .alinks{
    padding: 0;
    height: 100%;
    a{
    display: block;
    height: 100%;
    float: left;
    color: #333;
    cursor: pointer;
    text-align: center;
    font-size:.16rem;
    padding: 0;
    &.cur,&:hover{
      color:#2c0ac5;
    }
  }
  .logo{
    margin-left: 0px;
    padding-left: 0px;
    &:hover{
      color:#fff;
      background:none;
    }
    img{
      display: block;
      width: 60px;
      height: 100%;
      margin-right: 18px;
      float: left;
    }
    span{
      font-size: .22rem;
      color: #333;
    }
  }
  }
  .userLogin,.noLogin{
    position: relative;
    height: 100%;
    padding: 0;
    .userInfo{
      color:#333;
      &:hover{
        cursor: pointer;
      }
    }
    .chuliIconStyle{
        float: left;
        margin-top: 7px;
    }
    .loginExit{
      cursor: pointer;
      color:#fff;
      margin-left: 10px;
      &:hover{
        color: #deeadc;
      }
    }
  }
  .noLogin{
    p{
      display: inline-block;
      float: right;
    }
  }
  .infoList{
    position: absolute;
    top: 100%;
    right:4px;
    z-index: 9911;
    overflow: hidden;
    background: #f9f9f9;
    padding: 3px 10px;
  }
  .infoList li{
    line-height: 1;
    width: 100px;
    .surePublish{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      text-align: center;
      padding-left: 4px;
      padding-right: 4px;
      &:hover{
      }
    }
  }

  .goLogin{
    display: block;
    color:#333;
    height: 100%;
    cursor: pointer;
    &:hover{
      color:#e80d06;
    }
  }
}
}
@media (max-width: 375px) {
.top .topType{
        line-height: 35px;
}
 .top .topType .alinks a{
   padding:0 6px;
 }
 .top .topType .alinks .logo img{
   margin-right: 8px;
 }
}
</style>
