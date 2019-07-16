
<template>
  <div class="myMsg">
      <ul class="col-xs-4 col-md-3 col-lg-2 bg_write padding-0 type_msg">
          <li :class="{'cur':typeMsg==0}" @click="typeMsgs(0)">我的关注</li>
          <li :class="{'cur':typeMsg==1}" @click="typeMsgs(1)">我的评论</li>
          <li :class="{'cur':typeMsg==2}" @click="typeMsgs(2)">系统消息</li>
      </ul>
      <div class="col-xs-8 col-md-9 col-lg-10 padding-0 bg_write msg_con">
        
        <ul class="post-list list-group col-xs-12" v-if="typeMsg==0">
            <li class="list-group-item col-xs-12" v-for="(item,index) in publishListDetail" :key="index">
                <span class="title col-xs-8 col-md-9 col-lg-10">{{item.followUser}}</span>
                <span class="cacelFollow col-xs-4 col-md-3 col-lg-2 text-center" @click="cancelFollow(item.followId)">取消关注</span>
            </li>
        </ul>
        <ul class="post-list list-group col-xs-12" v-if="typeMsg==1">
            <li class="list-group-item col-xs-12" v-for="(item,index) in publishListDetail" :key="index">
                <div class="typeComment" v-html="commentSlice(item.commentCons,30)"></div>
                <p class="text-right">
                    <span class="cacelFollow" @click="cancelFollow(item.commentId)">删除评论</span>
                     <router-link :to="'/post/'+item.articleId" target="_blank" class="headerTitle">查看详情</router-link>
                </p>
            </li>
        </ul>
         <ul class="post-list list-group col-xs-12" v-if="typeMsg==2">
              <li class="list-group-item col-xs-12" v-for="(item,index) in publishListDetail" :key="index">
                <div class="typeComment">{{item.sys_name}}</div>
                 <p class="text-right">
                     <router-link v-if="item.sys_url" :to="item.sys_url" target="_blank" class="headerTitle">查看详情</router-link>
                </p>
            </li>
        </ul>
        <Pagebar v-show="publishListDetail.length>0" :page-model="pageModel" ref="publishPostListPage"></Pagebar>
          <div class="noCon"  v-if="publishListDetail.length==0">
               <p class="ct">
                  <i class="icon iconfont icon-empty"></i>
                  <a href="javascrip:void(0)">空空如也</a>
               </p>
          </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Pagebar from '../components/unit/table-pagebar'
  import { mapGetters,mapActions } from "vuex"
  import {
    tyApi
  } from "@/apis/api";
  export default {
    data() {
      return {
        typeMsg:0,
       pageModel:{
            url:"/webskill/getMyMsgs",
            limit:8,
            againPost:0
        }
      }
    },
    created() {

    },
    components: {
       Pagebar
    },
    methods: {
        commentSlice: function (con, len) {
        con = con.replace(/<\/?[^>]*>/g, '').replace(/\n[\s| | ]*\r/g, '\n').replace(/&nbsp;/ig, '');
        if (!con.length) {
          return con = "<a class='readAll'></a>"
        } else if (con.length > len) {
          return con.slice(0, len) + '...';
        } else {
          return con;
        }
      },
     typeMsgs(type){
        this.typeMsg=type;
            if(type==1){
                this.pageModel.url="/webskill/getMyComments"
            }else if(type==2){
                this.pageModel.url="/webskill/getSysMsgs"
            }else{
                this.pageModel.url="/webskill/getMyMsgs"
            }
            
            this.pageModel.againPost++;
      },
      cancelFollow(id){
          let _this=this;
          _this.$axios.post(tyApi().delComment,{
              delCommentId:id
          }).then((res) => {
              if(res.data.status=="success"){
                _this.pageModel.againPost++;
              }
               
        })
      }
    },
    computed: {
         ...mapGetters(['publishListDetail','userGrade'])
    },
    mounted() {
      
    }
  }

</script>

<style lang="scss" scoped>
.padding-0{
     padding: 0;
 }
.type_msg{
    border-right: 1px solid #ccc;
    li{
        padding: 8px;
        color: #fff;
        font-size: 14px;
        color: #000;
        cursor: pointer;
        &.cur{
             background:#b83241;
             color: #fff;
        }
    }
}
.typeComment{
    padding: 8px 0;
}
.cacelFollow{
    cursor: pointer;
    &:hover{
        color: #b83241;
    }
}
.msg_con{
    min-height: 280px;
    padding: 8px;
    font-size: 14px;
    .noCon{
        display: block;
        line-height: 280px;
        text-align: center;
        .ct{
            display: inline-block;
            width: 90px;
            text-align: center;
              i{
                font-size: 60px;
                line-height: 1;
                float: left;
                width: 80px;
              }
              a{
                  display: block;
                  width: 100%;
                  line-height: 1;
                  float: left;
                  margin-top: 8px;
              }
        }
      
        
    }
}
 .bg_write{
     background: #fff;
 }
 
</style>
