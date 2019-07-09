<template>
  <div id="app">
    <div class="main_blog">
      <!--顶部导航-->
      <v-top v-if="publicView"></v-top>
      <!--消息通知-->
      <!-- <transition enter-active-class="bounceInDown" leave-active-class="bounceInDown"> -->
      <!-- <div class="newMsgAlert container" v-if="publicView">
          <span class="msging">持续更新中....</span>
      </div> -->
      <!-- </transition> -->
      <!--内容区-->
      <div class="allConts container">
        <router-view :key="key"></router-view>
      </div>
    </div>
    <!--底部导航-->
    <v-footer v-if='publicView'></v-footer>
    <!--弹层提示-->
    <v-alert v-if='publicView'></v-alert>
    <!--留言入口-->
    <!-- <div class="leaveWord" v-if='publicView' @click="setAalertMsgFn()" title="我要留言"></div> -->
    <div class="leaveWord dot"  v-if='leaveWord' title="我要留言">
      <a href="/leaveword" target="_blank">
        <div class="dot2">
            <div class="dot3">我要发表</div>
        </div>
      </a>
    </div>

    <!--遮罩层-->
    <p class="maskZZ" v-show='maskZzShow'></p>
    <!--右侧固定悬浮-->
    <div class="ws-side-toolbar">
        <a class="option-box" v-if="wapOrPc=='pc'" @mouseover="showRwm()" @mouseleave="hideRwm()">
          <img src="/webskill/images/webskill_rwm.png" alt="" srcset="">
          <span class="show-txt" :class="{opricty1:sjView}">用手机</span>
          <div class="app-qr-box" v-show="sjView">
            <div class="bg-box">
                <div class="qr-item-box">
                    <img src="/webskill/images/webskill_rwm.png" alt="手机扫码预览">
                    <p class="desc">手机扫码预览</p>
                </div>
            </div>
          </div>
        </a>
        <a class="option-box" v-show="topView" @click="goTop()">
          <img src="/webskill/images/fhtop.png" alt="" srcset="">
        </a>
      </div>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import Top from '@/components/top';
import Footer from '@/components/footer';
import PopMsg from '@/components/content/popMsg';

export default{
  data () {
    return {
      publicView:false,
      leaveWord:false,
      sjView:false,
      topView:false
    }
  },
  created () {
    if (navigator.platform.indexOf('Win32') != -1 || navigator.platform.indexOf('Win64') != -1 || navigator.platform.indexOf('MacPPC') != -1 || navigator.platform.indexOf('MacIntel') != -1) {
      //PC
      this.setwapOrPcFn("pc");
    } else {
      //Wap

      this.setwapOrPcFn("wap");
    }
  },
  methods: {
    ...mapActions(["setAalertMsgFn","setwapOrPcFn"]),
    showRwm(){
        this.sjView=true;
    },
    hideRwm(){
        this.sjView=false;
    },
    goTop(){
         document.documentElement.scrollTop=0;
         document.body.scrollTop=0;
    }
  },
  mounted () {
      let _this=this;
    if(!location.pathname.includes("other")&&(location.pathname!="/login"||!location.pathname=="/webSkillAdmin")){
      this.publicView=true;
      if(location.pathname.indexOf("/leaveword")<0){
        this.leaveWord=true;
      }
    }
   window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > 360) {
            _this.topView=true;
        } else{
            _this.topView=false;
        }
    }
  },
  computed: {
    ...mapGetters(['maskZzShow','wapOrPc']),
    key() {
      let _that=this;
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  },
  components: {
    'v-top':Top,
    'v-footer':Footer,
    'v-alert':PopMsg
  }
}
</script>
<style lang="scss">
@import './assets/css/common.scss';
@import './assets/css/animation';
body{
  .allConts{
    margin-top: 80px;
  }
  .newMsgAlert{
    height:30px;
    position: relative;
    line-height: 30px;
    background: url("/webskill/images/messageAlert.png") center center;
    font-size: 14px;
    padding: 0 30px;
    margin:15px auto 20px auto;
    .msging{
      position:absolute;
      color: #fff;
    }
  }
  .leaveWord{
    position: fixed;
    top: 70%;
    left: 50px;
    cursor: pointer;
    color: #fff;
    border-radius: 50%;
  }
  .maskZZ{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000000;
    opacity: 0.5;
    background: #000;
  }
}
.ws-side-toolbar {
    position: fixed;
    right: 8px;
    bottom: 160px;
    width: 44px;
    z-index: 1999;
}
.ws-side-toolbar a.option-box {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
    background-color: #fff;
    text-align: center;
    height: 44px;
    cursor: pointer;
}
.ws-side-toolbar a.option-box:first-child {
    border-top: 1px solid #e0e0e0;
}
.ws-side-toolbar a.option-box[data-type=gotop].go-top-hide {
    visibility: hidden;
}
.ws-side-toolbar a.option-box img {
    display: block;
    width: 22px;
    height: auto;
}
.ws-side-toolbar a.option-box .show-txt {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 12px;
    line-height: 14px;
    background-color: #ca0c16;
    color: #fff;
    text-align: center;
    opacity: 0;
    -webkit-transition: opacity .3s ease-in-out;
    transition: opacity .3s ease-in-out;
}
.opricty1{
    opacity:1 !important;
}
.ws-side-toolbar a.option-box .app-qr-box {
    position: absolute;
    margin-right: 44px;
    right: 0;
    top: -157px;
    padding-right: 4px;
}
.ws-side-toolbar a.option-box .app-qr-box .bg-box {
    padding: 8px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
}
.ws-side-toolbar a.option-box .app-qr-box .bg-box .qr-item-box {
    margin: 8px;
    padding: 8px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
}
.ws-side-toolbar a.option-box img {
    display: block;
    width: 22px;
    height: auto;
}
.ws-side-toolbar a.option-box .app-qr-box .bg-box .qr-item-box p {
    margin: 8px 0 0;
    font-size: 14px;
    color: #4d4d4d;
}
.ws-side-toolbar a.option-box .app-qr-box .bg-box .qr-item-box img {
    display: block;
    width: 120px;
    height: auto;
}
@media (max-width: 1200px) {
    .allConts{
    padding-bottom: 30px !important; 
  }
  }
</style>