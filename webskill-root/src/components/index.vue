<template>
  <div class="hello">
     首页
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components:{
    
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/minxin';
.title{
  font-size: 30px;
  text-align: center;
  padding:10px 0;
}
.navLeft{
  @include sc(20px,#fff);
}
.v-enter {
  opacity: 0
}
.v-enter-active {
  transition: opacity 5s
}
</style>
