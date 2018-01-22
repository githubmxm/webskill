<!--
登录
-->
<template>
  <div class="login_main">
      <div class="login">
        <p class="codeTitle">
          <span>代码世界</br><i>code world</i></span>
        </p>
        <div class="usersLogin">
          <p class="loginType">
            <span class="submit" :class="{cur:loginTypeCur==0}" @click="loginType(0)">登录</span>
            <span class="goLook" :class="{cur:loginTypeCur==1}" @click="loginType(1)" >注册</span>
          </p>
          <div class="rlog">
              <p class="userAcount">
                  <span>账号: </span>
                  <input type="text" id="account" name="account" placeholder="2-20位中英文" v-model="user.account"/>
                </p>
                <p class="userPassWord">
                  <span>密码: </span>
                  <input type="text" id="password" name="password" placeholder="6-10位中英文" v-model="user.accoutPwd" />
                </p>
                <p class="userPassWord" v-show="loginTypeCur==1">
                  <span>邮箱: </span>
                  <input type="text" id="password" name="password" placeholder="注册邮箱" v-model="user.accoutEmail" />
                </p>
                <p class="error" :class="{visible:showError}">{{errorMsg}}</p>
          </div>
          <span class="surSubmit" @click="login">确 定</span>
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
        accoutPwd:"",
        accoutEmail:""
      },
      errorMsg:"",
      showError:true,
      loginTypeCur:0
    };
  },
  methods: {
    /*
    *desc:获取用户登录信息
    */
    loginType(index){
      this.loginTypeCur=index;
      this.errorMsg=""
    },
    login (){
      let _this=this;
      if(this.formValidata()){
          axios({
          method: 'post',
          url: '/webskill/login',
          data:{
            accoutType:_this.loginTypeCur,
            account:_this.user.account,
            accoutPwd:_this.user.accoutPwd,
            accoutEmail:_this.user.accoutEmail
          }
        }).then((res) => {
          let logindata = res.data;
          if(logindata.status=="success"){
            if(logindata.loginStatus){
              location.href="/index"
            }else{
              this.errorMsg=logindata.message;
              this.showError=false;
            }
          }else{
            this.errorMsg=logindata.message;
            this.showError=false;
          }
        })
      }
    },
    formValidata (){
      //正则
      var inP1=/^[A-Za-z0-9]+$/,
          allEi=/^([A-Za-z0-9]|[\u4E00-\u9FA5])+$/,
          exp = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
      function _ChkLengXz(ob,bytesL){
          //初始中文长度
          var s=0;
          //默认总长度字符
          var allL=0;
          for(var i=0;i<ob.replace(/\s+/g,"").length;i++)
          {
              if( /.*[\u4e00-\u9fa5]+.*$/.test(ob.replace(/\s+/g,"").charAt(i))){
                  s++;
              };
          }
          //英文个数总长
          var chi= ob.replace(/\s+/g,"").length-s;
          //总长
          allL=chi+s*2;
          if(allL>bytesL)
          {
              return false;
          }
          return true;
      };
      if(this.user.account==""||this.user.accoutPwd==""){
        this.errorMsg="账号或密码不能为空";
        this.showError=false;
        return false;
      }else if(!this.user.account||!this.user.accoutPwd||!inP1.test(this.user.accoutPwd)||this.user.accoutPwd.length>20||this.user.accoutPwd.length<6||!inP1.test(this.user.account)||this.user.account.length<2||this.user.account.length>20){
         this.errorMsg="账号或密码格式不对";
         this.showError=false;
      }else if(this.loginTypeCur==1&&!exp.test(this.user.accoutEmail)){
         this.errorMsg="邮箱格式不正确";
         this.showError=false;
      }else{
        this.showError=true;
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
  top: 317px;
    .codeTitle{
    display: inline-block;
    position: absolute;
    left: 540px;
    top: 75px;
    font-weight: bold;
    font-size: 24px;
    i{
      font-size: 18px;
      font-weight: bold;
      color: #00FF40;
      line-height: 20px;
    }
   }
  .usersLogin{
    display: inline-block;
    position: absolute;
    right: 258px;
    top: -19px;
  .surSubmit{
    display: inline-block;
    font-size: 14px;
    color: #000;
    background: #ffff;
    width: 166px;
    height: 28px;
    line-height: 28px;
    margin-left: 38px;
    text-align: center;
    cursor: pointer;
    &:hover{
      background: blueviolet;
      color: #fff;
    }
  }
    p{
    margin:10px 0;
    font-size: 16px;
    #account,#password{
      height: 28px;
      line-height: 28px;   
      border: 1px solid #ccc;
      padding-left: 10px;
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
    width: 165px;
    display: inline-block;
    margin-left: 39px;
  }
  .visible{
     visibility: hidden;
  }
  .submit,.goLook{
    width: 60px;
    height: 28px;
    border: 1px solid #ccc;
    background: #FFF;
    display: inline-block;
    line-height: 28px;
    cursor: pointer;
    margin-left: 39px;
    text-align: center;
    &:hover{
      background: blueviolet;
      color: #fff;
    }
  }
  .submit.cur,.goLook.cur{
     background: blueviolet;
    color: #fff;
  }
  }
}
}
</style>
