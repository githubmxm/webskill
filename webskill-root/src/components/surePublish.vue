<!--
待确认发布文章
-->
<template>
    <div class="surePublish row">
        <p class="navbar-header col-xs-12">
          <span class="navbar-brand  pull-left" :class="{'cur':myPostList==0,'col-xs-4':userGrade!=1,'col-xs-3':userGrade==1}"  @click="postPublishType(0)">待发布{{error}}</span>
          <span class="navbar-brand pull-left" :class="{'cur':myPostList==1,'col-xs-4':userGrade!=1,'col-xs-3':userGrade==1}" @click="postPublishType(1)">已发布{{errorHas}}</span>
          <span class="navbar-brand pull-left" :class="{'cur':myPostList==3,'col-xs-4':userGrade!=1,'col-xs-3':userGrade==1}" @click="postPublishType(3)">已收藏{{errorEn}}</span>
          <span class="navbar-brand pull-left col-xs-3" v-if="userGrade==1" :class="{'cur':myPostList==2}" @click="postPublishType(2)">留言区{{leaveErr}}</span>
        </p>
        <ul class="post-list list-group col-xs-12" v-if="myPostList==0||myPostList==1||myPostList==3">
            <li class="list-group-item col-xs-12" v-for="(item,index) in publishListDetail" :key="index">
                <span class="title col-xs-8 col-md-9 col-lg-11">{{item.publishPostTitle}}【{{item.publishPostAuthor}}】</span>
                <span v-if="myPostList==0" class="title col-xs-8 col-md-9 col-lg-11 articlVerStatus">审核状态: <i class="verStatus">{{item.publishPostStatus | filterPostStatus}}</i></span>
                <span class="look col-xs-4 col-md-3 col-lg-1 text-center">
                    <router-link v-if="myPostList==0" :to="'/previewpost/'+item.publishPostId" target="_blank" class="headerTitle">查看详情</router-link>
                    <router-link v-if="myPostList==1||myPostList==3" :to="'/post/'+item.publishPostId" target="_blank" class="headerTitle">查看详情</router-link>
                </span>
            </li>
        </ul>
        <ul class="post-list list-group col-xs-12" v-if="myPostList==2">
                <li class="list-group-item col-xs-12" v-for="(item,index) in publishListDetail" :key="index">
                    <span class="title col-xs-8 col-md-9 col-lg-11"><div class="conDetailLeave" v-html="item.leaveCon"></div>【{{item.leaveAuthor}}】-【{{item.leaveType | chainLeaveType}}】</span>
                    <span class="look col-xs-4 col-md-3 col-lg-1 text-center">
                        <router-link  :to="'/leaveDetail/'+item.leaveId" target="_blank" class="headerTitle">查看详情</router-link>
                    </span>
                </li>
        </ul>
        <Pagebar v-show="publishListDetail.length>0" :page-model="pageModel" ref="publishPostListPage"></Pagebar>
    </div>    
</template>


<script>
import Pagebar from '../components/unit/table-pagebar'
import { mapGetters,mapActions } from "vuex"
export default {
    name: "surePublish",
    data() {
        return {
            error:"",
            errorHas:"",
            errorEn:"",
            myPostList:0,
            leaveErr:"",
            pageModel:{
                url:"/webskill/getSurePublish",
                limit:15,
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
        },
        filterPostStatus(status){
            switch(status){
                case -1: return '驳回';
                break;
                case 0: return '审核中';
                break;
            }
        }
    },
    methods: {
        postPublishType(index){
            this.myPostList=index;
            this.pageModel.myPostList=index;
            if(index==3){
                this.pageModel.url="/webskill/getEnshrine"
            }else{
                this.pageModel.url="/webskill/getSurePublish"
            }
            
            this.pageModel.againPost++;
        }
    },
    components:{
      Pagebar
    },
    mounted () {
        // this.getSurePost();
    },
    computed: {
       ...mapGetters(['publishListDetail','userGrade'])
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
        padding-left: 15px;
        .articlVerStatus{
            margin-top: 3px;
            .verStatus{
                color: #00bfff;
            }
        }
    }
    .look{
        &:hover{
            cursor: pointer;
            color:#0f49cf;
        }
    }
</style>