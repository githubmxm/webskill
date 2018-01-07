<template>
  <div class="login">
      <p class="userAcount">
        <span>账号: </span>
        <input type="text" id="account" name="account" placeholder="账号" v-model="user.account"/>
      </p>
      <p class="userPassWord">
        <span>密码: </span>
        <input type="text" id="password" name="password" placeholder="密码" v-model="user.passWord" />
      </p>
      <p class="error" v-show="showError">{{errorMsg}}</p>
      <span class="submit" @click="login">登录</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      user:{
        account:"",
        passWord:""
      },
      errorMsg:"",
      showError:false
    };
  },
  methods: {
    /*
    *desc:获取用户登录信息
    */
    login (){
      let _this=this;
      if(this.formValidata()){
          axios({
          method: 'get',
          url: '/static/user.json'
        }).then((res) => {
          let users = res.data;
          if(users.account==_this.user.account&&users.passWord==_this.user.passWord){
            location.href="/index"
          }
        })
      }

    },
    formValidata (){
      if(this.user.account==""||this.user.passWord==""){
        this.errorMsg="账号或密码不能为空";
        this.showError=true;
        return false;
      }else{
        this.showError=false;
        return true;
      }
    }
  },
  computed: {
    
  },
  mounted () {
    
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/minxin';
.login{
  width:400px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
  padding: 50px;
  p{
    margin:10px 0;
    font-size: 16px;
    #account,#password{
      height: 28px;
      line-height: 28px;   
      border: 1px solid #ccc;
      padding-left: 5px;
      color: #000;
   }
  }
  .error{
    height: 20px;
    line-height: 20px;
    color: red;
    font-size: 12px;
    margin: 0;
    position: relative;
    top: -5px;
  }
  .submit{
    width: 60px;
    height: 28px;
    border: 1px solid #ccc;
    display: inline-block;
    line-height: 28px;
    cursor: pointer;
    margin-left: 42px;
  }
}


</style>
