<template>
  <div class="login">
    <p class="userAcount">
       <span>账号: </span>
       <input type="text" id="account" name="account" placeholder="账号" />
    </p>
    <p class="userPassWord">
       <span>密码: </span>
       <input type="text" id="password" name="account" placeholder="密码" />
    </p>
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
#account,#password{
  border: 1px solid #ccc;
  padding-left: 5px;
  color: #000;
}
.userAcount,.userPassWord{
  font-size: 16px;
}
</style>
