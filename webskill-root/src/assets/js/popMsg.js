/*
共用方法
*/

//弹层提示
import Vue from 'vue';
let MessageBox = Vue.extend(require('../../components/content/popMsg.1.vue'));
let instance;
var message = function(options){
    //生成组件
    instance = new MessageBox({
        data: options
    })
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
}

export default message;