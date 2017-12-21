<template>
  <div class="hello">
    <transition appear>
      <p class="title">这里有你想不到的和你想要的</p>
    </transition>
    <ul class="navLeft">
      <li>我是游客</li>
      <li>我是主宰</li>
    </ul>  
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
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
