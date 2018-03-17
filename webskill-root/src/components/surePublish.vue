<!--
待确认发布文章
-->
<template>
    <div class="surePublish row">
        <p class="navbar-header col-xs-12">
          <span class="navbar-brand col-xs-4 pull-left" :class="{cur:myPostList==0}"  @click="postPublishType(0)">待发布{{error}}</span>
          <span class="navbar-brand col-xs-4 pull-left" :class="{cur:myPostList==1}" @click="postPublishType(1)">已发布{{errorHas}}</span>
          <span class="navbar-brand col-xs-4 pull-left" :class="{cur:myPostList==2}" @click="postPublishType(2)">留言区{{leaveErr}}</span>
        </p>
        <ul class="post-list list-group col-xs-12" v-if="myPostList<2">
            <li class="list-group-item col-xs-12" v-for="item in publishListDetail">
                <span class="title col-xs-8 col-md-9 col-lg-11">{{item.publishPostTitle}}【{{item.publishPostAuthor}}】</span>
                <span class="look col-xs-4 col-md-3 col-lg-1 text-center">
                    <router-link v-if="myPostList==0" :to="'/previewpost/'+item.publishPostId" target="_blank" class="headerTitle">查看详情</router-link>
                    <router-link v-if="myPostList==1" :to="'/post/'+item.publishPostId" target="_blank" class="headerTitle">查看详情</router-link>
                </span>
            </li>
        </ul>
        <ul class="post-list list-group col-xs-12" v-if="myPostList==2">
                <li class="list-group-item col-xs-12" v-for="item in publishListDetail">
                    <span class="title col-xs-8 col-md-9 col-lg-11"><div class="conDetailLeave" v-html="item.leaveCon"></div>【{{item.leaveAuthor}}】-【{{item.leaveType | chainLeaveType}}】</span>
                    <!-- <span class="look col-xs-4 col-md-3 col-lg-1 text-center">
                        <router-link v-if="myPostList==0" :to="'/previewpost/'+item.publishPostId" target="_blank" class="headerTitle">查看详情</router-link>
                    </span> -->
                </li>
            </ul>
        <Pagebar v-show="publishListDetail.length>0" :page-model="pageModel" ref="publishPostListPage"></Pagebar>
    </div>    
</template>


<script>
import Pagebar from '../components/unit/table-pagebar'
import axios from 'axios'
import { mapGetters,mapActions } from "vuex"
export default {
    name: "surePublish",
    data() {
        return {
            error:"",
            errorHas:"",
            myPostList:0,
            leaveErr:"",
            pageModel:{
                url:"/webskill/getSurePublish",
                myPostList:0,
                againPost:0
            }
        };
    },
    filters: {
        chainLeaveType(leaveType){
            switch(leaveType){
                case 0: return '私密';
                break;
                case 1: return 'Bug';
                break;
                case 2: return '建议';
                break;
                case 3: return '技能解答';
                break;
            }
        }
    },
    methods: {
        postPublishType(index){
            this.pageModel.myPostList=this.myPostList=index;
            this.pageModel.againPost++;
        }
      //确认文章发布
    //   postPublishAjax:function(){
    //     let _this=this;
    //     axios({
    //       method: 'post',
    //       url: '/webskill/post/surePublish',
    //       data:{
    //         surePostId:_this.postId
    //       }
    //     }).then((res) => {
    //       var result=res.data;
    //       if(result.status=="success"){
    //         location.href="/index";
    //       }else{
    //         _this.postAjaxError="-"+result.message;
    //       }
    //     })
    //   },
    //   getSurePost:function(){
    //     let _this=this;
    //     axios({
    //       method: 'get',
    //       url: '/webskill/getSurePublish'
    //     }).then((res) => {
    //       var result=res.data;
    //       if(result.status=="success"){
    //         _this.publishPostList=result.data;
    //       }else{
    //         _this.error="-"+result.message;
    //       }
    //     })
    //   }
    },
    components:{
      Pagebar
    },
    mounted () {
        // this.getSurePost();
    },
    computed: {
       ...mapGetters(['publishListDetail'])
    }
};
</script>
  
<style lang="scss" scoped>
    .navbar-brand{
        float: none;
        text-align: center;
        background: #00bfff;
        color: #fff;
        cursor: pointer;
        &:hover{
            background:#25a4ce;
        }
    }
    .cur{
            background:#25a4ce;
    }
    .conDetailLeave{
        display: inline-block;
    }
    .post-list{
        font-size: 14px;
    }
    .look{
        &:hover{
            cursor: pointer;
            color:#0f49cf;
        }
    }
</style>