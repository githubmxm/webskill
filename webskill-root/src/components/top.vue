<template>
  <ul class="top">
    <li class="mainNavList" v-for="navs in mainNavs" :id="navs.mainNavId" :navid="navs.mainNavId" @mouseenter="mainNavEnter($event)" @mouseleave="mainNavLeave($event)">
      <a href="">{{navs.mainNavName}}</a>
      <ul class="deputyNavs">
        <li v-for="deputyNave in navs.deputyNav" :id="deputyNave.deputyNavId" :deputynavid="deputyNave.deputyNavId">
          <a href="">{{deputyNave.deputyNavName}}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "top",
  data() {
    return {
      msg: "主导航和二级导航展示"
    };
  },
  created() {},
  computed: {
    ...mapState({
      mainNavs: state => state.HeaderStore.mainNavs
    })
  },
  methods: {
    ...mapActions(["getNav"]),
    mainNavEnter:function(ele){
      if(ele.target.children[1]){
        console.log( ele.target.children[1].style)
         ele.target.children[1].style.display="block";
      }
    },
    mainNavLeave:function(ele){
      if(ele.target.children[1]){
        console.log( ele.target.children[1].style)
         ele.target.children[1].style.display="none";
      }       
    }
  },
  mounted: function() {
    this.getNav("/static/headJson.json");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/minxin";
.top {
  overflow: hidden;
  .mainNavList{
    width: 90px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    float: left;
    position: relative;
    @include sc(18px,#000);
    .deputyNavs{
      position: absolute;
    }
  }
}
</style>
