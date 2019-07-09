/**
 * axios二次封装
 * @author StarFire_xm
 * @param {get,post}
 * @description: 
 * get,post请求二次封装，扩展接口通用认证携带与接口拦截处理
 * 
 */
import axios from 'axios'
import qs from 'qs'

import {
  tyApi
} from "@/apis/api.js";
window.refresh = false; //保证token只在页面加载时调用一次
let isFirstAjaxToken=true;
let isFirstAjaxExit=true;
let forLogin="['/leaveword','/surePublish','/webSkillAdmin','/webSkillUpload','/dataMonitor','/myResource']";

// 请求方式的配置
export default {
  post(url, data) {
    let obj = {};
    obj.url = url;
    obj.data = data;
    obj.method = 'post';
    return this.getAction(obj);

  },
  get(url, data) {
    let obj = {};
    obj.url = url;
    obj.data = data;
    obj.method = 'get';
    return this.getAction(obj);

  },
  delete(url, data) {
    let obj = {};
    obj.url = url;
    obj.data = data;
    obj.method = 'delete';
    return this.getAction(obj);
  },
  put(url, data) {
    let obj = {};
    obj.url = url;
    obj.data = data;
    obj.method = 'put';
    return this.getAction(obj);
  },


   send(obj) {
    let ob = {
      method: obj.method,
      url: obj.url
    }
    if (obj.method == 'post' || obj.method == 'put') {
      ob.data = qs.stringify(obj.data);
    } else {
      ob.params = obj.data;
    }
    return new Promise((resolve, reject) => {
      axios(ob).then(res => {
          if(res.data.status=="login-or-authen"){
            localStorage.setItem("webskillloginstatus",0);
            location.href='/index';
          }
          if(res.data.status=="no-logine"||location.pathname!="/"&&forLogin.includes(location.pathname)&&res.data.status=="incorrect-login"||res.data.status=="incorrect-anthen-login"){
            localStorage.setItem("webskillloginstatus",0);
            resolve(this.getNewToken(function(){
                location.href='/login';
            }));
          }
          if(obj.url==tyApi().login||obj.url==tyApi().bindAccountLogin){
              if(res.data.status=='success'){
                resolve(this.getNewToken(function(){
                  localStorage.setItem("webskillloginstatus",1);
                  location.href='/index';
                }));
              }
          }
          resolve(res);
          if(obj.url==tyApi().loginExit){
            localStorage.clear();
            localStorage.setItem("webskillloginstatus",0);
            resolve(this.getNewToken());
          }
         
        })
        .catch(err => {
          reject(this.getNewToken());
        });
    });
  },

  //判断是否过期
  isExpired() {
    let thisTime=parseInt(new Date().getTime());
    return new Promise((resolve, reject) => {
        if(localStorage.getItem("webskilltoken")){
            let createTokenTime=parseInt(JSON.parse(localStorage.getItem("webskilltoken")).c);
            let getTf=localStorage.getItem("webskillloginstatus")==1?((thisTime-createTokenTime)/1000>60*60*24&&(thisTime-createTokenTime)/1000<60*60*24*7):((thisTime-createTokenTime)/1000>60*10&&(thisTime-createTokenTime)/1000<60*60*24*360);
            if (isFirstAjaxToken&&getTf) {
                isFirstAjaxToken=false;
                resolve(this.getNewToken());
            }else{
                resolve(true);
            }
        }else{
            isFirstAjaxToken=false;
            if(isFirstAjaxExit){
                isFirstAjaxExit=false;
                resolve(this.getNewToken());
            }
            
            resolve(true);
        }

      
     
    });
  },

  //获取token
  getNewToken(fn) {
    window.refresh = true;
    return new Promise((resolve, reject) => {
      axios.get(tyApi().getToken, {}).then(
        res => {
            let u={
                "t":res.data.token,
                "c":res.data.time
            }
            localStorage.setItem("webskilltoken",JSON.stringify(u));
            if(fn){
                fn();
            }
          resolve(true);
        }).catch(err => {
            resolve(false);
      });
    })
  },

  //封装的发送请求方法
  async getAction(obj) {
    let _that = this;
    let uStatus=localStorage.getItem("webskillloginstatus"); //过滤部分无用请求
    if(isFirstAjaxToken&&uStatus!=1&&location.pathname+location.search=="/index?g=t"){
      let aaa=await  _that.getNewToken();
      localStorage.setItem("webskillloginstatus",1);
      isFirstAjaxToken=false;
      if(aaa){
        if (!obj.url != tyApi().getToken) {
          await _that.isExpired();
          obj.data.token = localStorage.getItem("webskilltoken")?JSON.parse(localStorage.getItem("webskilltoken")).t:'';
        }
      }
      
    }else{
      if (!obj.url != tyApi().getToken) {
        await _that.isExpired();
        obj.data.token = localStorage.getItem("webskilltoken")?JSON.parse(localStorage.getItem("webskilltoken")).t:'';
      }
    }
  

    return _that.send(obj);
    
  }
}
