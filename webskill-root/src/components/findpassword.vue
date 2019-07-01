<template>
  <div class="findPassWord">
      <h1 class="findHead">找回密码</h1>
      <div class="pasWCon">
          <div class="accout" v-if="type=='accout'">
              <input class="findAcout inputFind" type="text" placeholder="请输入账号" v-model="accout" maxlength="20" />
              <p>
                <input class="findAcout inputFind" type="text" placeholder="请输入注册邮箱" v-model="email" maxlength="30" />
                <input class="getRZcode" @click="emailCode($event)" readonly="readonly" :disabled="emailcodevalue!='获取认证码'"  :value="emailcodevalue"></input>
              </p>
              <input class="findAcout" type="text" placeholder="请输入认证码" v-model="code" maxlength="8" />
          </div>
          <div class="accout" v-else-if="type=='resetPass'">
                <input class="findAcout" type="password" placeholder="请输入新密码" v-model="setPass" maxlength="20" />
          </div>
          <p class="errMsg">{{errMsg}}</p>
          <span class="findNext" @click="findPassWord()">下一步</span>
      </div>
  </div>    
</template>

<script>
import {
    tyApi
  } from "@/apis/api";
export default {
    name:'findPassWord',
    data(){
        return {
            type:"accout",
            accout:"",
            email:"",
            code:"",
            setPass:"",
            errMsg:"",
            emailcodevalue:"获取认证码",
            keepRepetition:false
        }
    },
    methods: {
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
        emailCode:function(event){
            let _this=this;
            this.errMsg="";
            if(this.accout==""){
                this.errMsg="请输入账号";
                return false;
            }
            if(this.email==""){
                this.errMsg="请输入注册邮箱";
                return false;
            }
            var  exp = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
            if(!exp.test(this.email)){
                this.errMsg="邮箱格式错误";
                return false;
            }
            if(this.keepRepetition){
                return false;
            }
            this.keepRepetition=true;
             _this.$axios.post(tyApi().findPassGetCode,{
                  findAccount:_this.accout,
                 findEmail:_this.email
          }).then((res) => {
                 let findGetCode=res.data;
                 _this.errMsg=findGetCode.message;
                 if(findGetCode.status=="success"){
                    _this.countDown(event,60)
                 }else if(_this.errMsg=="未达到下次发送时间"){
                    _this.countDown(event,findGetCode.data);
                 }else{
                    _this.keepRepetition=false;
                 }
             })
        },
        findPassWord:function(){
            let _this=this;
            this.errMsg="";
            if(this.type=="accout"){
                if(this.accout==""){
                    this.errMsg="请输入账号";
                    return false;
                }
                if(this.email==""){
                    this.errMsg="请输入注册邮箱";
                    return false;
                }
                var  exp = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
                if(!exp.test(this.email)){
                    this.errMsg="邮箱格式错误";
                    return false;
                }
                if(this.code==""){
                    this.errMsg="请输入认证码";
                    return false;
                }
            }
            if(this.type=="resetPass"){
                if(this.setPass==""){
                    this.errMsg="请输入新密码";
                    return false;
                }
            }
            _this.$axios.post(tyApi().findPassWordPost,{
             findLastAccount:_this.accout,
                 findLastEmail:_this.email,
                 findLastCode:_this.code,
                 findLastType:_this.type,
                 findLastPassWord:_this.setPass
          }).then((res) => {
                 let findPassWordPostData=res.data;
                 _this.errMsg=findPassWordPostData.message;
                 if(_this.type=="resetPass"){
                    if(findPassWordPostData.status=="success"){
                     location.href="/index";
                    }
                 }else{
                    if(findPassWordPostData.status=="success"){
                        _this.errMsg="";
                        _this.type="resetPass";
                    }
                 }
                
             })
        }
    }

}
</script>

<style lang="scss" scoped>
    .findPassWord{
        padding: .2rem;
        background: #fff;
        .findHead{
           color: #0ab120;
           font-size:.2rem;
        }
        .pasWCon{
            display: block;
            margin: 0 auto;
            margin-top: 10px;
            width: 235px;
            .accout{
                .findAcout{
                    border: 1px solid #ccc;
                    width: 160px;
                    height: 30px;
                    line-height: 30px;
                    padding-left: 5px;
                }
                .getRZcode{
                    font-size: 10px;
                    padding: 5px;
                    background: #188034;
                    color: #fff;
                    cursor: pointer;
                    display: inline-block;
                    width: 70px;
                    text-align: center;
                    &:hover{
                      background: #399652;
                    }
                }
            }
            .inputFind{
                margin-bottom: 10px;
            }
            .findNext{
                font-size: .16rem;
                padding: .05rem;
                background: #ccc;
                cursor: pointer;
                display: block;
                width: 70px;
                text-align: center;
                margin-left: .5rem;
                &:hover{
                    background: #67a5e5;
                    color:#fff;
                }
            }
        }
        .errMsg{
            height: 35px;
            line-height: 35px;
            color: red;
            font-size:.14rem;
        }
    }
</style>