<!--
首页
-->
<template>
  <div class="homePage">
     <div class="temp_01 clear">
        <transition  enter-active-class="fadeInLeft" leave-active-class="fadeInLeft">
        <!--最新摘要-->
        <div class="newDigest left" v-show="animationShow">
          <!-- <p class="stitle">
            <span>最新摘要</span>
          </p>
          <v-newDigest></v-newDigest> -->
          <p class="stitle">
            <span>云标签</span>
          </p>
          <v-cloudTag></v-cloudTag>
        </div>
        </transition>
        <!--广告轮播-->
        <transition enter-active-class="fadeInRight" leave-active-class="fadeInRight">
        <div class="carousels left" v-show="animationShow">
          <swiper :options="swiperOption"  ref="carouselsSwiper">
            <swiper-slide>
            <li><a title="StarFire_xm的博客"><img src="../assets/images/starfire.png" alt=""></a></li>
            </swiper-slide>
            <swiper-slide>
              <li><a title="点我吐槽" href="/leaveword" target="_blcank"><img src="../assets/images/tucao.png" alt=""></a></li>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div> 
          </swiper>
        </div>
        </transition>
     </div>
     <div class="mainCon clear">
       <transition enter-active-class="fadeInLeft" leave-active-class="fadeInLeft">
       <div class="conLf left" v-show="animationShow">
          <!--博主信息-->
          <div class="lfCon userInfo left">
            <p class="headImg"><img src="../assets/images/photo.png" alt="头像" /></p>
            <p class="hei blogger"><span>博主:</span> <span class="cor blogName">StarFire_xm</span></p>
            <p class="hei blogger"><span>职业:</span> <span class="cor lookPv">前端工程师</span></p>
            <p class="hei blogger"><span>兴趣:</span> <span class="cor focus">技术,运动</span></p>
            <p class="hei blogger"><span>联系(qq,wx):</span> <span class="cor lookPv">1123360735</span></p>
            <p class="hei blogger"><span>格言:</span> <span class="cor focus">择需,取上态而为之</span></p>
            <p class="PlayTour clear">
              <span>微信打赏:</span>
              <img src="../assets/images/wxrwm.png" alt="二维码" />
            </p>
          </div>
          <!--技能分类-->
          <div class="lfCon blogType left">
              <p class="blogCl">分类</p>
              <ul class="blogClList">
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
              </ul>
          </div>
          <!--最新访客-->
          <div class="lfCon visitors left">
              <p class="titV">最新访客</p>
              <ul class="vList">
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
                <li><img class="vPhoto" src="../assets/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
              </ul>
          </div>
       </div>
       </transition>
       <transition enter-active-class="fadeInRight" leave-active-class="fadeInRight">
       <div class="dynamicType left" v-show="animationShow">
         <ul class="typeName clear">
           <li class="jottings" :class="{cur:dynamicTypeCur==0}"  @click="dynamicType(0)">最新笔录</li>
           <li class="newSkill" :class="{cur:dynamicTypeCur==1}"  @click="dynamicType(1)">技能快讯</li>
           <li class="wordDec"  :class="{cur:dynamicTypeCur==2}" @click="dynamicType(2)">留言动态</li>
           <li class="tools" :class="{cur:dynamicTypeCur==3}"  @click="dynamicType(3)">推荐工具</li>
           <li class="searchs" :class="{cur:dynamicTypeCur==4}"  @click="dynamicType(4)">搜索导航</li>
         </ul>
         <div class="contentsForType">
           <ul class="contentList">
             <!--最新笔录-->
             <transition-group v-if="dynamicTypeCur==0&&dynamicDataList.length>0" enter-active-class="fadeIn" leave-active-class="fadeIn" @before-enter="beforeEnter">
             <li class="zxbl"  v-for="(item,index) in dynamicDataList" :key="index" :animate-delay="(0.3*index)" :animate-duration="0.5">
               <div class="cons">
                 <p class="titles">
                    <span class="intro">{{item.title}}</span>
                    <span class="creatTime right">{{item.creatTime}}</span>
                 </p>
                 <p class="Summarys">
                    <a class="sum_con">{{item.summary}}</a>
                 </p>
               </div>
             </li>
             </transition-group>
             <!--留言动态-->
              <div class="wordDynamic"  v-else-if="dynamicTypeCur==2">
                <a class="goLeaveWords blink" href="/leaveword" target="_blank">我要留言</a>
              </div>
             <!--搜索导航-->
            <div class="search"  v-else-if="dynamicTypeCur==4">
              <input type="text" name="" id="searchCon" placeholder="输入您要搜索的内容" />
              <span class="searchSubmit"  @click="setAalertMsgFn()">Find</span>
            </div>
             <!--敬请期待-->
             <transition v-else enter-active-class="bounceIn" leave-active-class="bounceIn">
             <p v-show="dynamicDataList.length==0" class="noCons">敬 请 期 待！</p>
             </transition>
           </ul>
         </div>
         <Pagebar v-show="dynamicDataList.length>0" :page-model="pageModel" ref="dynamicTypePage"></Pagebar>
       </div>
       </transition>
     </div>
  </div>
</template>

<script>
// import NewDigest from './content/newDigest'
import CloudTag from './content/cloudTag'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Pagebar from '../components/unit/table-pagebar'
import { mapGetters,mapActions } from "vuex"
export default {
  name: "index",
  data() {
    return {
      msg: "首页内容",
      dynamicTypeCur:0,
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        autoplay:true,//自动滚动
        loop: true,
        notNextTick: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
      },
      pageModel:{
        url:"/static/ajaxpage.json",
        againPost:0
      },
      animationShow:false
      // pageModelUrl:"/static/ajaxpage.json"
    };
  },
  components:{
    // 'v-newDigest':NewDigest,
    'v-cloudTag':CloudTag,
     swiper,  
     swiperSlide,
     Pagebar
  },
  methods: {
    ...mapActions(['setAalertMsgFn']),
    beforeEnter(el){
       var delay = el.getAttribute('animate-delay'),
          duration = el.getAttribute('animate-duration');
      console.log('attr:' + delay, duration);
      var cssObj = {
          "animation-delay": delay+'s',
          "-webkit-animation-delay": delay+'s',
          "animation-duration": duration+'s',
          "-webkit-animation-duration": duration+'s',
          "visibility": "visible"
      }
      var getCssText = function(obj) {
          var text = [];
          for(var o in obj) {
              text.push(o + ":" + obj[o])
          }
          return text.join(';')
      }
      el.style.cssText = getCssText(cssObj);
    },
    dynamicType(index){
      this.dynamicTypeCur=index;
      if(index==0){
        this.pageModel.url="/static/ajaxpage.json"
      }else if(index==1){
        this.pageModel.url="/static/ajaxpage.1.json"
      }else if(index==2){
        this.pageModel.url="/static/ajaxpage.1.json"
      }else{
        this.pageModel.url="/static/ajaxpage.1.json"
      }
      this.pageModel.againPost++;
    },
    // swiper() {
    //     return this.$refs.carouselsSwiper.swiper;
    // }
    
  },
  mounted () {
    this.animationShow=true;
  },
  computed: {
    ...mapGetters(['dynamicDataList'])
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/minxin';
@import '../assets/css/animation';
.homePage{
  .temp_01{
    margin-bottom: 38px;
    background: #fff;
    .newDigest{
      width:310px;
      .stitle{
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 8px;
        span{
          height: 30px;
          line-height: 30px;
          font-size: 18px;
          font-weight: 700;
          margin-left: 15px;
        }
      }
    }
    .carousels{
      margin-left:28px;
      width:860px;
      height:278px;
      ul{
        height: 100%;
        li{
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    }
  }
  .mainCon{
    .conLf{
      width:230px;
      .lfCon{
        width: 100%;
        padding: 10px 30px;
        border: 1px solid #ccc;
        margin-bottom: 15px;
      }
    }
    .userInfo{
      background: url("../assets/images/bloogerBg.png") center center;
      .headImg{
        width:60px;
        height: 60px;
        margin:10px auto;
        img{
          width:100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .hei{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
      .PlayTour{
        margin: 15px auto;
        span{
          display: inline-block;
          font-size: 14px;
          margin-bottom: 8px;
        }
        img{
          width:100px;
          height:100px;
        }
      }
      .blogger{
        .cor{
           color:#0366d6;
        }
        .blogName{
          
        }
      }
    }
    .visitors{
      padding:10px !important;
      .titV{
        color: #000;
      }
      .vList{
        margin-top: 10px;
        li{
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          .vPhoto{
            width:15px;
            height:15px;
            vertical-align: middle;
          }
          .vName{
            margin-left: 7px;
            color: #4b7318;
          }
          .vTime{
            float: right;
          }
        }
      }
    }
    .blogType{
      padding:10px !important;
      .blogClList{
        margin-top: 10px;
        li{
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          .conName{
            margin-left: 5px;
          }
        }
      }
    }
    .dynamicType{
      width:950px;
      margin-left: 20px;
      background: url("../assets/images/indexBgW3.png") center center;
      .typeName{
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #e8e8e8;
        li{
          display: inline-block;
          width: 144px;
          font-size: 18px;
          float: left;
          text-align: center;
          color: #000;
          cursor: pointer;
        }
        li.cur{
            border-bottom: 2px solid #5eaeef;
            color: #5eaeef!important;
        }
      }
      .contentsForType{
        width: 880px;
        margin-top: 2px;
        font-size: 18px;
        .contentList{
          .noCons{
            font-size: 22px;
            color: #19b77e;
            text-align: center;
            margin: 20px auto;
          }
          .zxbl{
            &:hover{
              background: #e2e9e1;
            }
            .cons{
              margin: 0 0 0 23px;
              padding-bottom: 25px;
              border-bottom: 1px dashed #ccc;
              padding-right: 24px;
              position: relative;
              .titles{
                padding-top: 25px;
                margin-bottom: 8px;
                .intro{
                  color: #2d64b3;
                }
                .creatTime{
                  color: #bdbdbd;
                  font-size: 14px;
                  float: right;
                }
              }
              .Summarys{
                .sum_con{
                  font-size: 14px;
                }
              }
            }
          }
          .search{
             display: inline-block;
             margin: 10px 0 8px 35px;
             #searchCon{
               height: 27px;
               line-height: 27px;
               border: 1px solid #ccc;
               width: 300px;
               padding-left: 8px;
             }
             .searchSubmit{
               display: inline-block;
               font-size: 14px;
               cursor: pointer;
               width:35px;
               height: 25px;
               line-height: 25px;
               text-align: center;
               background: #cddce0;
               color: #000;
               border-radius: 3px;
               &:hover{
                 background: #16E36A;
                 color: #fff;
               }
             }
          }
          .wordDynamic{
            .goLeaveWords{
              display: inline-block;
              margin: 10px 0 8px 35px;
              cursor: pointer;
              color: #1EC965;
            }
          }
        }
        
      }
    }
  }

}
</style>
