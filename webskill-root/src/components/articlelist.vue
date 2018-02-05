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
                    <div class="skillDigetList">
                        <article class="articles">
                           <div class="arBoder">
                                <header class="articleHeader">
                                    <h1><a class="headerTitle" href="">文章标题</a></h1>
                                </header>
                                <div class="articleCons">
                                    <p class="articleDigest">摘要</p>
                                </div>
                                <p class="articleReadAll">
                                    <a href="">阅读全文</a>
                                </p>
                           </div>
                           <footer class="articleFooter clear">
                                <span class="arTit left">js#win使用</span>
                                <p class="arItem right">
                                    <span class="time">2018-01-10</span>&nbsp;&nbsp;<span class="comment"><i class="itRed">0</i>次评论</span>&nbsp;&nbsp;<span class="readed"><i class="itRed">0</i>次阅览</span>
                                </p>
                            </footer>
                        </article> 
                    </div>
                </section>
            </div>
        </div>
        <div class="adverLf left col-lg-3 col-sm-4 col-xs-12">
            222
        </div>
    </div>
</template>
<script>
export default{
    name:'articlelist',
    data() {
        return {
            articelSkillType:this.$route.params.skilltype,
            skillListDetail:[1]
        }
    },
    methods: {
        
    },
    mounted () {
        
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
                .arBoder{
                    border-bottom: 1px solid #ccc;
                    padding-bottom: .2rem;
                    .articleHeader{
                        .headerTitle{
                            display: inline-block;
                            font-size:.22rem;
                            margin:10px 0;
                        }
                    }
                    .articleCons{
                        margin: .1rem 0 .2rem 0;
                        font-size:.16rem;
                        .articleDigest{

                        }
                    }
                    .articleReadAll{
                        display: inline-block;
                        line-height: 1em;
                        padding: .06rem .15rem;
                        border-radius: .15rem;
                        background: #eee;
                        color: #999;
                        text-shadow: 0 1px #fff;
                        text-decoration: none;
                        a{
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