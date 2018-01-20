<!--
公用头部导航
-->
<template>
  <div class="top">
    <nav class="topType">
      <p class="alinks clear">
        <a title="技百讯" class="logo" href="/index">
          <img src="../assets/images/jbxLogo.png" alt="技百讯" />
          <span>技百讯</span>
        </a>
        <a class="indexView" href="/index" target="_blank" title="首页">首页</a>
        <!-- href="/myNotes" href="/newTitle"-->
        <a class="myNotesView" title="技能摘要" @click="setAalertMsgFn()">技库</a>
        <a class="newTitleView" title="技能快讯" @click="setAalertMsgFn()">资讯</a>
      </p>
      <!--用户已登录-->
      <p class="userLogin" v-if="isLogin==true">
         <span class="userInfo"></span>
      </p>
      <!--未登录或异常-->
      <div class="noLogin" v-else>
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
import { mapActions,mapGetters } from "vuex";
export default {
  name: "top",
  data() {
    return {
      msg: "主导航和二级导航展示",
      jbx: true
    };
  },
  created() {
    
  },
  computed: {
    ...mapGetters(['mainNavs','isLogin'])
  },
  methods: {
    ...mapActions(["getNav",'getLoginState','setAalertMsgFn'])
  },
  mounted: function() {
    this.getNav();
    this.getLoginState();
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
  font-size: 14px;
  .alinks{
    width:80%;
    height: 100%;
    float: left;
    a{
    display: block;
    height: 100%;
    padding: 0 8px;
    float: left;
    margin:0 15px;
    color:#fff;
    cursor: pointer;
    text-shadow: 3px 3px 3px #000;
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
      font-size: 22px;
      color: #fff;
    }
  }
  }
  .userLogin,.noLogin{
    display: block;
    float: left;
    width:20%;
    height: 100%;
    .userInfo{
      color:#fff;
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
    margin: 0 8px;
    height: 100%;
    padding: 0 8px;
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
</style>
