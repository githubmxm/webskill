<!--
公用头部导航
-->
<template>
  <header class="top container-fluid">
    <nav class="topType row">
      <p class="alinks clear col-lg-5">
        <a title="技百讯" class="logo col-lg-4" href="/index">
          <img src="/webskill/images/jbxLogo.png" alt="技百讯" />
          <span>技百讯</span>
        </a>
        <a class="indexView col-lg-2" href="/index" target="_blank" title="首页">首页</a>
        <!-- href="/myNotes" href="/newTitle"-->
        <a class="myNotesView col-lg-2" title="技能摘要" target="_blank" href="/articlelist/all">技库</a>
        <a class="newTitleView col-lg-2" title="技能快讯" @click="setAalertMsgFn()">资讯</a>
        <a class="coTitleView col-lg-2" href="/cooperation" target="_blank" title="商务合作">合作</a>
      </p>
      <!--用户已登录-->
      <p class="userLogin  col-lg-2 right" v-if="loginStatue" @mouseleave="listHide()">
        <span class="loginExit right" @click="loginExit()">退出</span>
        <span class="userInfo right" @mouseover="listShow()">[{{username}}]</span>
        <ul class="infoList ul_down" v-if="myPostInfoShow" v-show="showInfoList">
          <li>
              <a class="surePublish" href="/surePublish" target="_blank">我的文章</a>
          </li>
          <li>
            <a class="surePublish" href="/webskillAdmin" target="_blank">发布文章</a>
          </li>
          <li>
            <a class="surePublish" href="/myResource" target="_blank">我的资源</a>
          </li>
          <li>
            <a class="surePublish" href="/webskillUpload" target="_blank">上传资源</a>
          </li>
          <li>
              <a class="surePublish" v-if="dataMonitorShow" href="/dataMonitor" target="_blank">数据监控</a>
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
import axios from 'axios'
import { mapActions,mapGetters } from "vuex";

export default {
  name: "top",
  data() {
    return {
      msg: "主导航和二级导航展示",
      jbx: true,
      username:"",
      showInfoList:false,
      myPostInfoShow:false,
      dataMonitorShow:false
    };
  },
  created() {
    
  },
  computed: {
    ...mapGetters(['loginStatue'])
  },
  methods: {
    ...mapActions(['setAalertMsgFn','setLoginStatueFn','setLoginUserFn','setUserGradeFn']),
    loginExit(){
      var _this=this;
      axios({
        method: 'post',
        url: '/webskill/loginExit'
      }).then((res) => {
        let userState = res.data
        if (userState.status == "success") {
          _this.setLoginStatueFn(false)
          _this.username="";
          _this.setLoginUserFn(_this.username);
        }
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
    axios({
      method: 'get',
      url: '/webskill/loginStatus'
    }).then((res) => {
      let userState = res.data
      if (userState.status == "success") {
        _this.setLoginStatueFn(true);
        _this.username=userState.data.userName;
        if(userState.data.userGrade<3){
          _this.myPostInfoShow=true;
        }
        _this.setLoginUserFn(_this.username);
        if(userState.data.userGrade==1){
          _this.dataMonitorShow=true;
        }else{
          _this.dataMonitorShow=false;
        }
      }else{
        _this.setLoginStatueFn(false);
        _this.setUserGradeFn(0);
        _this.setLoginUserFn("");
      }
    })
  }
 
};
</script>

<style lang="scss" scoped>
@import "../assets/css/minxin";
@import '../assets/css/animation';
.top{
  min-width: 360px;
  background: #45b367;
  padding: 0 20px;
  .topType{
  height: 50px;
  line-height: 50px;
  font-size: .14rem;
  .alinks{
    height: 100%;
    float: left;
    a{
    display: block;
    height: 100%;
    float: left;
    color: #fff;
    cursor: pointer;
    text-shadow: 3px 3px 3px #000;
    text-align: center;
    font-size:.16rem;
    .cur,&:hover{
      color:#5eaeef;
      background: #333;
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
      color: #fff;
    }
  }
  }
  .userLogin,.noLogin{
    position: relative;
    height: 100%;
    .userInfo{
      color:#fff;
      &:hover{
        cursor: pointer;
        color: #02ff00;
      }
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
    right:55px;
    z-index: 9911;
    overflow: hidden;
  }
  .infoList li{
    line-height: 1;
    border-bottom: 1px solid #ccc;
    .surePublish{
      display: inline-block;
      color: #fff;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #8929e3;
      padding-left: 8px;
      padding-right: 8px;
      &:hover{
        background: #9f4fe9;
      }
    }
  }

  .goLogin{
    display: block;
    color:#fff;
    height: 100%;
    cursor: pointer;
    padding: 0 15px;
    &:hover{
      color:#5eaeef;
      background: #333;
    }
  }
}
}

// .top {
//   background:#acdcac;
//   .mainNavList{
//     text-align: center;
//     cursor: pointer;
//     float: left;
//     position: relative;
//     padding: 10px;
//     @include sc(18px,#000);
//     .deputyNavs{
//       display:none;
//       position: absolute;
//       top: 44px;
//       li{
//         padding:3px;
//         background: #ccc;
//       }
//     }
//     &:hover .deputyNavs{
//       display: block;
//     }
//   }
// }
@media (max-width: 375px) {
 .top .topType .alinks a{
   padding:0 6px;
 }
 .top .topType .alinks .logo img{
   margin-right: 8px;
 }
}
</style>
