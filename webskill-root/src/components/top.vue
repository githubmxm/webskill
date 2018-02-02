<!--
公用头部导航
-->
<template>
  <div class="top container-fluid">
    <nav class="topType row">
      <p class="alinks clear col-lg-4">
        <a title="技百讯" class="logo col-lg-5" href="/index">
          <img src="../assets/images/jbxLogo.png" alt="技百讯" />
          <span>技百讯</span>
        </a>
        <a class="indexView col-lg-2" href="/index" target="_blank" title="首页">首页</a>
        <!-- href="/myNotes" href="/newTitle"-->
        <a class="myNotesView col-lg-2" title="技能摘要" @click="setAalertMsgFn()">技库</a>
        <a class="newTitleView col-lg-2" title="技能快讯" @click="setAalertMsgFn()">资讯</a>
      </p>
      <!--用户已登录-->
      <p class="userLogin  col-lg-2 right" v-if="loginStatue">
        <span class="loginExit right" @click="loginExit()">退出</span>
         <span class="userInfo right">[{{username}}]</span>
      </p>
      <!--未登录或异常-->
      <div class="noLogin col-lg-1 right" v-else>
        <p>
          <a href="/login" class="goLogin">登录</a>
        </p>
      </div>
    </nav>
  </div>
 
  <!-- <ul class="top clear">
    <li class="mainNavList" v-for="navs in mainNavs" :id="navs.mainNavId" :navid="navs.mainNavId">
      <a class="mainName" href="/index">{{navs.mainNavName}}</a>
      <ul class="deputyNavs">
        <li class="deputyNavList" v-for="deputyNave in navs.deputyNav" :id="deputyNave.deputyNavId" :deputynavid="deputyNave.deputyNavId">
          <a class="deputName" href="">{{deputyNave.deputyNavName}}</a>
        </li>
      </ul>
    </li>
  </ul> -->
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
      username:""
    };
  },
  created() {
    
  },
  computed: {
    ...mapGetters(['mainNavs','loginStatue'])
  },
  methods: {
    ...mapActions(["getNav",'setAalertMsgFn','setLoginStatueFn','setLoginUserFn']),
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
    }
  },
  mounted: function() {
    let _this=this;
    this.getNav();
    axios({
      method: 'get',
      url: '/webskill/loginStatus'
    }).then((res) => {
      let userState = res.data
      if (userState.status == "success") {
        _this.setLoginStatueFn(true);
        _this.username=userState.data.userName;
        _this.setLoginUserFn(_this.username)
      }else{
        _this.setLoginStatueFn(false);
        _this.setLoginUserFn("");
      }
    })
  }
 
};
</script>

<style lang="scss" scoped>
@import "../assets/css/minxin";
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
    height: 100%;
    .userInfo{
      color:#fff;
    }
    .loginExit{
      cursor: pointer;
      color:#fff;
      margin-left: 10px;
    }
  }
  .noLogin{
    p{
      display: inline-block;
      float: right;
    }
  }
  .goLogin{
    display: block;
    color:#fff;
    height: 100%;
    cursor: pointer;
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
