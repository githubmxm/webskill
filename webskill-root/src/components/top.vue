<template>
  <ul class="top">
    <li>sssss</li>
  </ul>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      msg: "公共头部导航"
    };
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
