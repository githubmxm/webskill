<template>
  <ul class="top">
    <li v-for="(k,v) in navT" :id="k">{{v}}</li>
  </ul>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
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
    ...mapState({
      navT:state=>state.HeaderStore.navT
    })
  },
  methods: {
    ...mapActions([
      'getNav'
    ])
  },
  mounted:function(){
    this.getNav("/static/headJson.json");
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
        float: left;
        @include sc(28px,#000);
      }
      
  }
</style>
