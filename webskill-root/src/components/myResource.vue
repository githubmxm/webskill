<!--
后台数据统计
-->
<template>
  <div class="dataMonitor col-md-12" hidden>
      <p class="errMsg" v-show="errMsg!==''">{{errMsg}}</p>
      <p class="labels col-md-3 col-xs-6">当前文章总数：<span>{{articleDistribution.articleNum}}</span> 篇</p>
      <p class="labels col-md-3 col-xs-6">今日访客总数：<span>{{articleDistribution.todayVisitor}}</span> 人</p>
      <p class="labels col-md-3 col-xs-6">今日新增文章：<span>{{articleDistribution.todayNewArticle}}</span> 篇</p>
      <p class="labels col-md-3 col-xs-6">今日新增用户：<span>{{articleDistribution.todayNewUsers}}</span> 人</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        articleDistribution:{
          "articleNum":0,
          "todayVisitor":0,
          "todayNewArticle":0,
          "todayNewUsers":0
        },
        errMsg:""
      }
    },
    created() {

    },
    components: {

    },
    methods: {
      getArticleDistribution(){
        let _this=this;
        axios({
          method: 'GET',
          url: '/webskill/article/distribution',
          data:{
            r:Math.random()
          }
        }).then((res) => {
          let result=res.data;
          if(result.status=="success"){
            let dataD=result.data;
            _this.articleDistribution.articleNum=dataD.articlNum;
            _this.articleDistribution.todayVisitor=dataD.visiterNum;
             _this.articleDistribution.todayNewArticle=dataD.newArticls;
             _this.articleDistribution.todayNewUsers=dataD.newUsers;
          }else{
            _this.errMsg=res.message;
          }
        })
      }
    },
    computed: {

    },
    mounted() {
      this.errMsg="";
      this.getArticleDistribution();
    }
  }

</script>

<style lang="scss" scoped>
  .dataMonitor{
    .errMsg{
      color: red;
      font-size:14px;
      text-align:center;
      margin-bottom:18px;
    }
    .labels{
      font-size: 14px;
      margin:12px 0;
    }
  }
</style>
