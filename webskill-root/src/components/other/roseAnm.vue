
<template>
  <div class="roseAnm">
    <p class="title">欢迎来到私人定制</p>
    <p class="one">本页为<span class="td">全球唯一</span>专属频道</p>
    <p>请按以下操作输入内容，即可获取为您定制的专属礼品</p>
    <p class="first">姓名:<input class="iny" type="text" v-model="name"/></p>
    <p class="first">电话:<input class="iny" type="number" v-model="phone"/></p>
    <p class="first">住址:<input class="iny" type="text" v-model="area"/></p>
    <p class="first">兴趣:<textarea class="iny" type="text" v-model="like"></textarea></p>
    <p class="first">备注:<textarea class="iny" type="text" v-model="romat"></textarea></p>
    <p class="error">{{error}}</p>
    <p class="submit" @click="submit"><button>提交</button></p>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    tyApi
  } from "@/apis/api";
  export default {
    data() {
      return {
        name:'',
        phone:'',
        area:'',
        like:'',
        romat:'',
        error:''
      }
    },
    created() {

    },
    components: {

    },
    methods: {
      
      submit(){
        let _this=this;
          axios({
          method: 'post',
          url: '/webskill/other',
          data:{
            name:_this.name,
            phone:_this.phone,
            area:_this.area,
            like:_this.like,
            romat:_this.romat
          }
        }).then((res) => {

          if(_this.name!='蒋倩倩'){
            _this.error='姓名不匹配';
            return false;
          }
          if(_this.phone.length!=11){
            _this.error='手机号不正确';
             return false;
          }
          if(_this.area.length==0){
            _this.error='地址不能为空';
             return false;
          }
            this.error="恭喜您提交成功,请等待审核";
        })
      }
    },
    computed: {

    },
    mounted() {
      
    }
  }

</script>

<style lang="scss" scoped>
  .roseAnm{
    font-size: 20px;
    width: 300px;
    margin:0 auto;
    p{
      margin: 10px 0;
      &.title{
        text-align: center;
        color: #8a2be2;
      }
      &.one{
        font-size: 12px;
        text-align: center;
      }
      &.first{
        margin-top: 20px;
      }
      .td{
        color: red;
      }
    }
    .iny{
      border: 1px solid #ccc;
      margin-left: 10px;
    }
    .error{
      color: red;
    }
    .submit{
      text-align: center;
      margin: 0 auto;
      padding: 5px;
      font-size: 16px;
    }
  }
</style>
