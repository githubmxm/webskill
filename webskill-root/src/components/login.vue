<!--
登录
-->
<template>
  <div class="login_main" v-if="loginShow">
      <div class="login">
        <!-- <p class="codeTitle">
          <span>代码世界</br><i>code world</i></span>
        </p> -->
        <div class="usersLogin">
          <p class="loginType">
            <span class="submit" :class="{cur:loginTypeCur==0}" @click="loginType(0)">登录</span>
            <span class="goLook" :class="{cur:loginTypeCur==1}" @click="loginType(1)" >注册</span>
          </p>
          <div class="rlog">
              <p class="userAcount">
                  <span>账&nbsp;&nbsp;&nbsp;号: </span>
                  <input type="text" id="account" name="account" placeholder="2-20位中英文下划线" maxlength="20" v-model="user.account"/>
                </p>
                <p class="userPassWord">
                  <span>密&nbsp;&nbsp;&nbsp;码: </span>
                  <input type="password" id="password" name="password" autocomplete="off" placeholder="6-20位中英文" maxlength="20" v-model="user.accoutPwd" />
                  <a target="_blank" href="/findpassword" class="findPass">找回密码</a>
                </p>
                <p class="userPassWord" v-show="loginTypeCur==1">
                  <span>邮&nbsp;&nbsp;&nbsp;箱: </span>
                  <input type="text" id="email" name="email" placeholder="注册邮箱" v-model="user.accoutEmail" maxlength="30" />
                  <input class="emailCode" @click="emailCode($event)" readonly="readonly" :disabled="emailcodevalue!='获取认证码'"  :value="emailcodevalue"></input>
                </p>
                <p class="userPassWord" v-show="loginTypeCur==1">
                  <span>认证码: </span>
                  <input type="text" id="emailcode" name="emailcode" placeholder="邮箱认证码" v-model="user.accoutEmailCode" maxlength="8" />
                </p>
                <p class="userCode">
                  <span>验证码: </span>
                  <input type="text" id="userCode" name="verification code" placeholder="验证码" maxlength="6" v-model="user.accoutVcode" />
                  <span class="imgCode" @click="refreshVcode()" v-html="vcode"></span>
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
        accoutEmail:"",
        accoutEmailCode:"",
        accoutVcode:"",
      },
      errorMsg:"",
      showError:true,
      loginTypeCur:0,
      loginShow:false,
      emailcodevalue:"获取认证码",
      keepRepetition:false,
      vcode:""
    };
  },
  created () {
    let _this=this;
    axios({
        method: 'get',
        url: '/webskill/loginStatus'
      }).then((res) => {
        let loginstatus = res.data;
        if(loginstatus.status=="success"){
          location.href="/index"
        }else{
          _this.loginShow=true;
        }
    })
  },
  methods: {
    loginType(index){
      this.loginTypeCur=index;
      this.errorMsg="";
      this.getVcode();
    },
    getVcode:function(){
      let _this=this;
      axios({
          method: 'get',
          url: '/webskill/vcode',
          params:{
            r:Math.random()
          }
        }).then((res) => {
          _this.vcode=res.data;
      })
    },
    refreshVcode:function(){
      this.getVcode();
    },
    countDown:function(event,time){
      var _this=this;
      event.target.style.background="#ccc";
      var timeInt=setInterval(function(){
        if(time>0){
          time--;
          _this.emailcodevalue=time;
        }else{
          clearInterval(timeInt);
          event.target.style.background="#188034";
          _this.emailcodevalue="获取认证码";
           _this.keepRepetition=false;
        }
      },1000)
    },
    emailCode(event){
      let _this=this;
      if(this.formValidata("nocode")){
        if(this.keepRepetition){
          return false;
        }
        this.keepRepetition=true;
        axios({
          method: 'post',
          url: '/webskill/register',
          data:{
            accoutType:_this.loginTypeCur,
            account:_this.user.account,
            accoutPwd:_this.user.accoutPwd,
            accoutEmail:_this.user.accoutEmail
          }
        }).then((res) => {
          let registerdata = res.data;
          _this.errorMsg=registerdata.message;
          _this.showError=false;
          if(registerdata.status=="success"){
             _this.countDown(event,60);
          }else if(_this.errorMsg=="未达到下次发送时间"){
            _this.countDown(event,registerdata.data);
          }else{
             _this.keepRepetition=false;
          }
        })
      }
    },
    login (){
      let _this=this;
      if(this.formValidata("","login")){
          axios({
          method: 'post',
          url: '/webskill/login',
          data:{
            accoutType:_this.loginTypeCur,
            account:_this.user.account,
            accoutPwd:_this.user.accoutPwd,
            accoutEmail:_this.user.accoutEmail,
            accoutEmailCode:_this.user.accoutEmailCode,
            vcode:_this.user.accoutVcode
          }
        }).then((res) => {
          let logindata = res.data;
          if(logindata.status=="success"){
            location.href="/index";
          }else{
            this.errorMsg=logindata.message;
            this.showError=false;
          }
        })
      }
    },
    formValidata (code,source){
      this.errorMsg="";
      //正则
      var inP1=/^[A-Za-z0-9_]+$/,
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
      }else if(this.loginTypeCur==1){
        if(!this.user.accoutEmail){
          this.errorMsg="请输入注册邮箱";
          this.showError=false;
          return false;
        }
        if(!exp.test(this.user.accoutEmail)){
          this.errorMsg="邮箱格式不正确";
          this.showError=false;
          return false;
        }
        if(code!="nocode"&&!this.user.accoutVcode&&source=="login"){
          this.errorMsg="验证码不能为空";
          this.showError=false;
          return false;
        }
        if(code!="nocode"&&!this.user.accoutEmailCode){
          this.errorMsg="认证码不能为空";
          this.showError=false;
          return false;
        }
        this.showError=true;
        return true;
      }else{
        if(source=="login"){
          if(!this.user.accoutVcode){
          this.errorMsg="验证码不能为空";
          this.showError=false;
          return false;
         }
        }
        this.showError=true;
        return true;
      }
    }
  },
  computed: {

  },
  mounted () {
      this.getVcode();
  }
};
</script>
<style lang="scss" scoped>
.login_main{
  display: block;
  width: 300px;
  margin: 0 auto;
  margin-top: 242px;
  .login{
    .codeTitle{
    display: inline-block;
    font-weight: bold;
    font-size: 24px;
    i{
      font-size: 18px;
      font-weight: bold;
      color: #00FF40;
      line-height: 20px;
    }
   }
   .findPass{
     color:#3929b5;
     cursor: pointer;
     &:hover{
      text-decoration: underline;
      color:red;
     }
   }
  .usersLogin{
    display: inline-block;
    .emailCode{
      font-size:10px;
      padding:5px;
      background:#188034;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      width: 70px;
      text-align: center;
      &:hover{
        background: #399652;
      }
    }
  .surSubmit{
    display: inline-block;
    font-size: 14px;
    color: #000;
    background: #ffff;
    width: 166px;
    height: 28px;
    line-height: 28px;
    margin-left: .57rem;
    text-align: center;
    cursor: pointer;
    &:hover{
      background: blueviolet;
      color: #fff;
    }
  }
    p{
    margin:10px 0;
    font-size: .16rem;
    #account,#password,#email,#emailcode,#userCode{
      width: 165px;
      height: 28px;
      line-height: 28px;   
      border: 1px solid #ccc;
      padding-left: 10px;
      color: #000;
   }
   .userCode{
     margin-top: -7px;
   }
   #userCode{
     width:95px;
   }
   .imgCode{
       display: inline-block;
       cursor: pointer;
       position: relative;
       top: .08rem;
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
    margin-left: .58rem;
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
    text-align: center;
    &:hover{
      background: blueviolet;
      color: #fff;
    }
  }
  .submit{
    margin-left: .54rem;
    margin-right: .41rem;
  }

  .submit.cur,.goLook.cur{
     background: blueviolet;
     color: #fff;
  }
  }
}
}
 @media (max-width: 413px) {
   .submit{
      margin-left: .62rem !important;
   }
 }
</style>
