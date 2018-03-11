<!--
单类技能列表
-->
<template>
    <div class="articleList clear">
        <div class="left col-lg-9 col-sm-8 col-xs-12">
            <div class="conLf col-lg-11 col-sm-11 col-xs-12">
                <p class="noList" v-if="!skillListDetail.length">
                  内容更新中...敬请期待！！！
                </p>
                <section class="clear skillListCon"  v-else>
                    <div class="skillDigetList" v-for="item in skillListDetail">
                        <article class="articles">
                           <div class="arBoder clear">
                             <div class="clear">
                                    <div style="width:20%" class="arBoderImg left">
                                            <img src="/webskill/upload/1520744020321.png" width=100% title="" alt="">
                                    </div>
                                   <div class="arBorderDetail left">
                                        <header class="articleHeader">
                                            <h1><router-link :to="'/post/'+item.newNoteId" target="_blank" class="headerTitle">{{item.newNoteTitle}}</router-link></h1>
                                        </header>
                                        <div class="articleCons">
                                            <p class="articleDigest">{{item.newNoteConts}}</p>
                                        </div>
                                       
                                   </div>
                             </div>
                               <p class="articleReadAll">
                                    <router-link class="reda" :to="'/post/'+item.newNoteId" target="_blank">阅读全文</router-link>
                                </p>
                           </div>
                           <footer class="articleFooter clear">
                                <span class="arTit left">#js#{{item.newNoteLabel}}</span>
                                <p class="arItem right">
                                    <span class="time">{{item.newNoteTime}}</span>&nbsp;&nbsp;<span class="comment"><i class="itRed">{{item.newNoteCommentAll}}</i>次评论</span>&nbsp;&nbsp;<span class="readed"><i class="itRed">{{item.newNoteViewNum}}</i>次阅览</span>
                                </p>
                            </footer>
                        </article> 
                    </div>
                </section>
            </div>
            <!-- <Pagebar v-show="skillListDetail.length>0" :page-model="pageModel" ref="skillListTypePage"></Pagebar> -->
        </div>
        <div class="adverLf left col-lg-3 col-sm-4 col-xs-12">
            待发布
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    name:'articlelist',
    data() {
        return {
            articelSkillType:this.$route.params.skilltype,
            skillListDetail:[],
            // pageModel:{
            //     url:"/webskill/newestNote",
            //     dynamicTypeCur:0,
            //     againPost:0
            // },
        }
    },
    methods: {
        
    },
    mounted () {
      let _this=this;
      axios({
        method: 'get',
        url: '/webskill/articleTypeList',
        params:{
          r:Math.random(),
          skillType:_this.articelSkillType
        }
      }).then((res) => {
        let articleList = res.data;
        if (articleList.status == "success") {
          _this.skillListDetail=articleList.data;
        }else{
         _this.skillListDetail=[];
        }
      })
    }
}
</script>
<style lang="scss" scoped>
    .conLf,.adverLf{
        background: #fff;
        padding: .2rem;
        .noList{
            font-size:.18rem;
        }
    }
    .skillType{
        font-size:.22rem;
    }
    .skillListCon{
        .noList{
            margin:18px 0;
            font-size:.18rem;
            color: #35a2bc;
            text-align: center;
        }
        .skillDigetList{
            font-size:.18rem;
            padding:.1rem;
            padding-bottom: 25px;
            .articles{
                border-bottom: 1px solid #ccc;
                padding-bottom: .2rem;
                .arBoder{
                    .arBorderImg{
                        width:20%;
                    }
                    .arBorderDetail{
                        width: 80%;
                        padding-left: 2%;
                    }
                    .articleHeader{
                        .headerTitle{
                            display: inline-block;
                            width: 100%;
                            overflow: hidden;
                            word-wrap: break-word;
                            font-size:.20rem;
                        }
                    }
                    .articleCons{
                        font-size:.16rem;
                        margin-top: 5px;
                        .articleDigest{

                        }
                    }
                    .articleReadAll{
                        display: inline-block;
                        height: .3rem;
                        line-height: .17rem;
                        padding: .06rem .15rem;
                        border-radius: .15rem;
                        background: #eee;
                        color: #999;
                        text-shadow: 0 1px #fff;
                        text-decoration: none;
                        margin-top: 15px;
                        float: right;
                        .reda{
                            font-size:.16rem;
                            color:#999;
                        }
                        &:hover{
                            background: red;
                           a{
                            text-decoration: none;
                            color: #fff;
                           }
                        }
                    }
                }
                .articleFooter{
                    font-size:.14rem;
                   margin-top:.2rem;
                   .arTit{
                       color: #ccc;
                   }
                   .arItem{
                       .time,.comment,.readed{
                           color:#ccc;
                       }
                       .itRed{
                           color: red;
                       }
                   }
                }
                
            }
            
        }
    }
    
</style>