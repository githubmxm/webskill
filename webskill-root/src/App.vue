<template>
  <div id="app">
    <div class="main_blog">
      <!--顶部导航-->
      <v-top v-if="publicView"></v-top>
      <!--消息通知-->
      <!-- <transition enter-active-class="bounceInDown" leave-active-class="bounceInDown"> -->
      <div class="newMsgAlert" v-if="publicView">
          <span class="msging">持续更新中....</span>
      </div>
      <!-- </transition> -->
      <!--内容区-->
      <div class="allConts">
        <router-view></router-view>
      </div>
    </div>
    <!--底部导航-->
    <v-footer v-if='publicView'></v-footer>
    <!--弹层提示-->
    <v-alert v-if='publicView'></v-alert>
    <!--留言入口-->
    <!-- <div class="leaveWord" v-if='publicView' @click="setAalertMsgFn()" title="我要留言"></div> -->
    <div class="leaveWord dot"  v-if='leaveWord' @click="setAalertMsgFn()" title="我要留言">
      <a>
        <div class="dot2">
            <div class="dot3">我要留言</div>
        </div>
      </a>
    </div>

    <!--遮罩层-->
    <p class="maskZZ" v-show='maskZzShow'></p>
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
      leaveWord:false
    }
  },
  methods: {
    ...mapActions(["setAalertMsgFn"])
  },
  mounted () {
    if(location.pathname!="/login"){
      this.publicView=true;
      if(location.pathname.indexOf("/leaveword")<0){
        this.leaveWord=true;
      }
    }
  },
  computed: {
    ...mapGetters(['maskZzShow'])
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
  background: #fafafa;
  .allConts{
    width:1200px;
    margin:0 auto;
  }
  .newMsgAlert{
    width:1200px;
    height:30px;
    position: relative;
    line-height: 30px;
    background: url("./assets/images/messageAlert.png") center center;
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
    // width: 48px;
    // height: 48px;
    // background:url('./assets/images/leaveWord.jpg') no-repeat 0 0;
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
</style>