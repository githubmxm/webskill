<!--
登录
-->
<template>
    <div class="bindAccount">
        <div class="zczh">
            <dl class="tit_wx clearfix">
                <dt><img :src="user.headerImg"></dt>
                <dd><span>{{user.userName}},您好！</span></dd>
            </dl>
            <div class="tab_wxzh">
                <div class="tab_wxzh_in">
                    <span class="cur" onclick="changeBindType(1)">绑定账号</span>
                    <!-- <span onclick="changeBindType(0)" class="">创建新账号</span> -->
                </div>
            </div>
            <div class="tab_wxform">
                <div class="tab_wxform_in" style="display: block;">
                    <div class="form_list">
                        <div class="form_input"><input name="old_account" v-model="user.account" id="old_account" type="text" class="input_320 icon_name input_tel" placeholder="用户名"></div>
                        <div class="old_account"></div>
                        <div class="hidmail" id="hidmail-1" style="display: none;">

                        </div>
                    </div>
                    <div class="form_list">
                        <div class="form_input"><input name="pwd" v-model="user.accoutPwd" id="pwd" type="password" class="input_320 icon_pass input_tel" placeholder="密码"></div>
                        <div class="pwd"></div>
                    </div>
                    <div class="form_list clearfix">
                        <div class="clearfix">
                            <a href="/findpassword" target="_blank" class="right cl_9">忘记密码？</a>
                        </div>
                    </div>
                    <div class="form-group1 form_list">
                         <div id="bind_login_msg" class="bind_login_msg">{{errorMsg}}</div>
                        <span class="btn input-submit" id="bind_old_login" @click="bindLogin">绑定并登录</span>
                    </div>
                </div>
                <div class="tab_wxform_in" style="display: none;">
                    <div class="form_wxts">温馨提示：已有技百讯账号请进行绑定，避免生成多个账号</div>
                    <div class="form_list" style="position: relative">
                        <div class="form_input"><input name="new_account" type="text" maxlength="30" class="input_320 icon_tel input_tel" id="new_account" placeholder="请输入手机号"></div>
                        <div class="new_account"></div>
                        <div class="hidmail" id="hidmail-0" style="display: none;">

                        </div>
                    </div>
                    <div class="form_list">
                        <div class="form_input">
                        <input name="captcha" type="text" class="input_150 left" placeholder="请输入验证码" id="verify_code" maxlength="4">
                        <a class="yzmbox right">
                        <img id="w0-image" src="/third-party/captcha?v=5d1eaa06eddee" alt="图片无法加载" title="点击换图" style="cursor:pointer">					</a></div>
                        <div class="verify_code"></div>
                    </div>


                    <!-- <div class="form_list" id="mobile_reg_input" style="display:none;">
                        <div class="form_input">
                            <input name="sms_code" id="sms_code" maxlength="5" type="text" class="input_150 left" placeholder="短信验证码">
                            <input name="" type="button" class="input_yzm right" value="获取验证码" id="send_sms_code">
                        </div>
                        <div class="sms_code"></div>
                    </div>
                    <div class="form-group1 form_list">
                        <input class="btn input-submit" value="创建并登录" id="bind_login" type="button">
                        <div id="bind_reg_msg"></div>
                    </div> -->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import {
    tyApi
  } from "@/apis/api";
export default {
  name: "index",
  data() {
    return {
       user:{
        headerImg:decodeURIComponent(this.$route.query.hu)||"",
        userName:decodeURIComponent(this.$route.query.count)||"",
        account:"",
        accoutPwd:"",
        userCode:this.$route.query.r||""
      },
      errorMsg:""
    };
  },
  created () {
    if(localStorage.getItem("webskillloginstatus")==1){
        location.href="/index";
    }
  },
  methods:{
    ...mapActions(["setUserGradeFn"]),
    formValidata (){
      this.errorMsg="";
      //正则
      var inP1=/^[A-Za-z0-9_]+$/,
          allEi=/^([A-Za-z0-9]|[\u4E00-\u9FA5])+$/,
          exp = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
      if(this.user.account==""||this.user.accoutPwd==""){
        this.errorMsg="账号或密码不能为空";
        return false;
      }else if(!this.user.account||!this.user.accoutPwd||!inP1.test(this.user.accoutPwd)||this.user.accoutPwd.length>20||this.user.accoutPwd.length<6||!inP1.test(this.user.account)||this.user.account.length<2||this.user.account.length>20){
         this.errorMsg="账号或密码格式不对";
         return false;
      }else if(!this.user.userCode){
          this.errorMsg="参数异常错误,请重试";
          return false;
      }
      return true;
    },
    bindLogin(){
      let _this=this;
      if(_this.formValidata()){
          _this.$axios.post(tyApi().bindAccountLogin,{
            account:_this.user.account,
            accoutPwd:_this.user.accoutPwd,
            userCode:_this.user.userCode
         }).then((res) => {
          let logindata = res.data;
          if(logindata.status=="success"){
            localStorage.setItem("webskillloginstatus",1);
            _this.setUserGradeFn(logindata.data.userGrade);
          }else{
            this.errorMsg=logindata.message;
          }
        })
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
.zczh {
    margin: 50px auto;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    background: #fff;
    position: relative;
    .bind_login_msg{
        color: red;
    }
    .tit_wx {
        width: 322px;
        margin: 0 auto;
        padding: 50px 0;
        dt {
            float: left;
            width: 80px;
            text-align: right;
            img{
                width: 43px;
                height: 43px;
                border-radius: 43px;
            }
        }
        dd{
            float: left;
            width: 230px;
            padding-left: 12px;
            padding-top: 10px;
            font-size: 16px;
            color: #666;
        }
    }
    .tab_wxzh {
        border-bottom: 1px solid #dcdcdc;
        margin: 0 25px;
        height: 40px;
        line-height: 40px;
        .tab_wxzh_in {
            width: 100%;
            float: left;
            text-align: center;
            text-align: center;
            span{
                margin: 0 50px;
                font-size: 20px;
                color: #333;
                padding: 0 20px 10px 20px;
                line-height: 25px;
                cursor: pointer;
                &.cur{
                    border-bottom: 3px solid #c91623;
                    color: #c91623;
                }
            }
        }
    }
    .tab_wxform {
        .right{
            float: right;
        }
        a{
            text-decoration: none;
        }
        .cl_9{
            color: #999;
        }
        .input-submit{
            margin: 10px auto 27px;
            display: block;
            padding: 0;
            text-align: center;
            font-family: "MicroSoft YaHei";
        }
        padding-bottom: 80px;
        .tab_wxform_in {
            padding-top: 45px;
            display: none;
            .form_list {
                position: relative;
                width: 322px;
                margin: 0 auto 15px;
                &.form-group1 {
                    margin-top: 16px;
                    .input-submit{
                        background:red;
                        font-size: 16px;
                        color: #fff;
                        cursor: pointer;
                        width: 322px;
                        height: 45px;
                        line-height: 45px;
                        font-weight: 100;
                    }
                }
                .form_input {
                    height: 40px;
                    line-height: 40px;
                    width: 100%;
                    .input_tel{
                        padding-left: 40px;
                        width: 270px;
                        border: 1px solid #DFE1E8;
                        padding: 0 10px;
                    }
                    input{
                        margin-bottom: 0;
                    }
                }
                .hidmail {
                    position: absolute;
                    top: 45px;
                    left: 0;
                    width: 320px;
                    border: 1px solid #dfe1e8;
                    background: #fff;
                    display: none;
                    color: #6a6a6a;
                    z-index: 200;
                }
            }
        }
    }
}
</style>
