<template>
  <ul class="top">
    <li class="mainNavList" v-for="navs in mainNavs" :id="navs.mainNavId" :navid="navs.mainNavId">
      <a class="mainName" href="">{{navs.mainNavName}}</a>
      <ul class="deputyNavs">
        <li class="deputyNavList" v-for="deputyNave in navs.deputyNav" :id="deputyNave.deputyNavId" :deputynavid="deputyNave.deputyNavId">
          <a class="deputName" href="">{{deputyNave.deputyNavName}}</a>
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
    ...mapActions(["getNav"])
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
    text-align: center;
    cursor: pointer;
    float: left;
    position: relative;
    @include sc(18px,#000);
    .deputyNavs{
      display:none;
      position: absolute;
    }
    &:hover .deputyNavs{
      display: block;
    }
   
  }
}
</style>
