<template>
  <ul class="top clear">
    <li class="mainNavList" v-for="navs in mainNavs" :id="navs.mainNavId" :navid="navs.mainNavId">
      <a class="mainName" href="/index">{{navs.mainNavName}}</a>
      <ul class="deputyNavs">
        <li class="deputyNavList" v-for="deputyNave in navs.deputyNav" :id="deputyNave.deputyNavId" :deputynavid="deputyNave.deputyNavId">
          <a class="deputName" href="">{{deputyNave.deputyNavName}}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations, mapActions,mapGetters } from "vuex";
export default {
  name: "top",
  data() {
    return {
      msg: "主导航和二级导航展示"
    };
  },
  created() {
    
  },
  computed: {
    ...mapGetters(['mainNavs'])
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
  background:#acdcac;
  .mainNavList{
    text-align: center;
    cursor: pointer;
    float: left;
    position: relative;
    padding: 10px;
    @include sc(18px,#000);
    .deputyNavs{
      display:none;
      position: absolute;
      top: 44px;
      li{
        padding:3px;
        background: #ccc;
      }
    }
    &:hover .deputyNavs{
      display: block;
    }
  }
}
</style>
