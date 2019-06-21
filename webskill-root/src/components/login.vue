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
          <p class="loginType row">
            <span class="submit col-xs-6" :class="{cur:loginTypeCur==0}" @click="loginType(0)">账号登录</span>
            <span class="goLook col-xs-6" :class="{cur:loginTypeCur==1}" @click="loginType(1)" >注册账号</span>
          </p>
          <div class="rlog">
              <p class="userAcount">
                  <input v-if="loginTypeCur==0" type="text" id="account" name="account" placeholder="账号" maxlength="20" v-model="user.account"/>
                  <input v-if="loginTypeCur==1" type="text" id="account" name="account" placeholder="由2-20位中英文下划线组成的账号" maxlength="20" v-model="user.account"/>
                </p>
                <p class="userPassWord">
                  <input v-if="loginTypeCur==0" type="password" id="password" name="password" autocomplete="off" placeholder="密码" maxlength="20" v-model="user.accoutPwd" />
                    <input v-if="loginTypeCur==1" type="password" id="password" name="password" autocomplete="off" placeholder="由6-20位数字英文组成的密码" maxlength="20" v-model="user.accoutPwd" />
                </p>
                <p class="userPassWord" v-show="loginTypeCur==1">
                  <input type="text" id="email" name="email" placeholder="请输入注册邮箱" v-model="user.accoutEmail" maxlength="30" />
                  <input class="emailCode" @click="emailCode($event)" readonly="readonly" :disabled="emailcodevalue!='获取认证码'"  :value="emailcodevalue" />
                </p>
                <p class="userPassWord" v-show="loginTypeCur==1&&emailCodeShow">
                  <input type="text" id="emailcode" name="emailcode" placeholder="邮箱认证码" v-model="user.accoutEmailCode" maxlength="8" />
                </p>
                <p class="userCode">
                  <input type="text" id="userCode" name="verification code" placeholder="验证码" maxlength="6" v-model="user.accoutVcode" />
                  <span class="imgCode" @click="refreshVcode()" v-html="vcode"></span>
                </p>
               
                <p class="error" :class="{visible:showError}">{{errorMsg}}</p>
          </div>
          <span class="surSubmit" @click="login">确 定</span>
           <p class="pull-right">
                <a target="_blank" href="/findpassword" class="findPass">忘记密码</a>
            </p>
        </div>
      </div>
  </div>
 
</template>

<script>
import { mapGetters,mapActions } from "vuex";
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
      emailCodeShow:false,
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
    ...mapActions(["setUserGradeFn"]),
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
        this.emailCodeShow=false;
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
             _this.emailCodeShow=true;
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
            _this.setUserGradeFn(logindata.data.userGrade);
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
    float: right;
    width: 450px;
    height: 444px;
    position: relative;
    padding: 30px 60px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    margin-top: 50px;
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
     color:#000;
     cursor: pointer;
     &:hover{
      color:red;
     }
   }
  .usersLogin{
    .loginType{
        padding: 0 5px;
        margin-bottom: 10px;
        border-bottom: 2px solid #f5f5f5;
        span.cur{
            border: none;
            border-bottom-width: 2px;
            border-bottom-color: #ca0c16;
            border-bottom-style: solid;
        }
    }
    .emailCode{
      font-size:10px;
      padding:5px;
      cursor: pointer;
      display: inline-block;
      width: 70px;
      text-align: center;
      margin-top: 3px;
      &:hover{
        color: #ca0c16;
      }
    }
  .surSubmit{
       display: block;
        text-align: center;
        vertical-align: middle;
        border: 1px solid transparent;
        white-space: nowrap;
        cursor: pointer;
        touch-action: manipulation;
        padding: 8px 12px;
        font-size: 14px;
        font-weight: 400;
        height: 37px;
        line-height: 1.5;
        border-radius: 4px 4px;
        user-select: none;
        color: #fff;
        background-color: #ca0c16;
        border-color: transparent;
    &:hover{
      background:#ea0d19;
      color: #fff;
    }
  }
    p{
    margin:10px 0;
    font-size: .16rem;
    #account,#password,#email,#emailcode,#userCode{
     display: block;
    width: 100%;
    height: 32px;
    padding: 8px;
    border-radius: 4px 4px;
    line-height: 32px;
    font-size: 14px;
    color: #4d4d4d;
    border: 1px solid #ccc;
    background-color: #fff;
    background-image: none;
   }
   #email{
       width: 200px;
       float: left;
       margin-right: 57px;
   }
   .userCode{
     margin-top: -7px;
   }
   #userCode{
     width: 208px;
     float: left;
     margin-right: 40px;
   }
   .imgCode{
       display: inline-block;
       cursor: pointer;
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
  }
  .visible{
     visibility: hidden;
  }
  .submit,.goLook{
    height: 28px;
    background: #FFF;
    display: inline-block;
    line-height: 28px;
    cursor: pointer;
    text-align: center;
    &:hover{

    }
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
