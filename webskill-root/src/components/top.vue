<template>
  <ul class="top">
    <li v-for="(k,v) in navT" :id="nav">{{v}}</li>
  </ul>
</template>

<script>
// import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name: "top",
  data() {
    return {
      msg: "公共头部导航"
    };
  },
  created () {
    
  },
  computed: {
    // ...mapState({
    //   navT:Store=>Store.state.navT
    // })
  },
  methods: {
    // ...mapActions([
    //   'getNav'
    // ])

  },
  mounted:function(){
    console.log(Store.state.HeaderStore.navT.length);
    // this.getNav("../json/headJson.json");
  }
};
</script>

<style lang="scss" scoped>
   @import '../assets/css/minxin';
  .top{
      overflow: hidden;
      li{
        width:90px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        @include sc(28px,#fff);
      }
      
  }
</style>
