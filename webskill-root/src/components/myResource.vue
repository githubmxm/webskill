<!--
我的资源
-->
<template>
    <div class="surePublish row">
        <p class="navbar-header col-xs-12 text-center">
         我的资源
        </p>
        <ul class="post-list list-group col-xs-12">
                <li class="list-group-item col-xs-12" v-for="(item,index) in getMyResource" :key="index">
                    <span class="conDetailLeave">{{item.resourceName}}</span>
                    <a class="dowenResource" :href="item.resourceUrl | filename">点我下载</a>
                </li>
            </ul>
        <Pagebar v-show="getMyResource.length>0" :page-model="pageModel" ref="publishPostListPage"></Pagebar>
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
            leaveErr:"",
            pageModel:{
                url:"/webskill/getMyResource",
                limit:15,
                againPost:0
            }
        };
    },
    methods: {
        postPublishType(index){
            this.pageModel.againPost++;
        }
    },
    filters: {
        filename(file){
          let fileS=JSON.parse(file)[0];
          let fileSplit=fileS.split("/");
          let fileName=fileSplit[fileSplit.length-1]
          return 'webskill/downloadResource?fileName='+fileName+'&token='+JSON.parse(localStorage.getItem("webskilltoken")).t;
        }
    },
    components:{
      Pagebar
    },
    mounted () {
        // this.getSurePost();
    },
    computed: {
       ...mapGetters(['getMyResource'])
    }
};
</script>
  
<style lang="scss" scoped>
    .navbar-header{
      font-size: .18rem;
      margin-bottom: 10px;
    }
    .dowenResource{
      float: right;
      color: blue;
    }
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