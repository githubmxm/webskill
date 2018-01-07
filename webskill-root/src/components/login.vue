<template>
  <div class="login_main">
      <div class="login">
        <p class="codeTitle">
          <span>代码世界</br><i>code world</i></span>
        </p>
        <div class="rlog">
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
      </div>
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
          }else{
            this.errorMsg="账号或密码错误";
            this.showError=true;
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
<style>
body{
  background: url("../assets/images/bl.png") repeat-x;
}
</style>
<style lang="scss" scoped>
@import '../assets/css/minxin';
body{
  min-width: 1400px;
}
.login_main{
  width:1400px;
  height: 500px;
  margin: 0 auto;
  background: url("../assets/images/timg.jpg") no-repeat 0 0;
  position: relative;
  .login{
  width:1400px;
  height: 200px;
  position:relative;
  top: 282px;
  .codeTitle{
    display: inline-block;
    position: absolute;
    left: 540px;
    top: 100px;
    font-weight: bold;
    font-size: 24px;
    i{
      font-size: 18px;
      font-weight: bold;
      color: #00FF40;
      line-height: 20px;
    }
  }
  .rlog{
    top: 25px;
    right: 245px;
    position: absolute;
  }
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
    text-align: center;
  }
}
}


</style>
