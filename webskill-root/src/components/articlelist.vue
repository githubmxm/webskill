<!--
单类技能列表
-->
<template>
    <div class="articleList clear">
        <div class="left col-lg-9 col-sm-8 col-xs-12">
            <div class="conLf col-lg-11 col-sm-11 col-xs-12">
                <h1 class="skillType">{{articelSkillType}}</h1>
                <section class="clear skillListCon">
                    <p class="noList" v-if="!skillListDetail.length">
                        内容更新中...敬请期待！！！
                    </p>
                    <div v-else>
                        <ul class="skillDigetList">
                            <li>
                                111
                            </li>
                        </ul>
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
            margin:18px 0;
            li{
                font-size:.18rem;
            }
        }
    }
    
</style>