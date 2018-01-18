<template>
  <div class="homePage">
     <div class="temp_01 clear">
        <!--最新摘要-->
        <div class="newDigest left">
          <p class="stitle">
            <span>最新摘要</span>
          </p>
          <v-newDigest></v-newDigest>
        </div>
        <!--广告轮播-->
        <div class="carousels left">
          <swiper :options="swiperOption"  ref="carouselsSwiper">
            <swiper-slide>
             <li><a title="StarFire_xm的博客"><img src="../assets/images/starfire.png" alt=""></a></li>
            </swiper-slide>
            <swiper-slide>
              <li><a title="点我吐槽" href=""><img src="../assets/images/tucao.png" alt=""></a></li>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div> 
          </swiper>
          <!-- <ul>
            <li><a title="点我吐槽" href=""><img src="../assets/images/tucao.png" alt=""></a></li>
          </ul> -->
        </div>
     </div>
     <div class="mainCon clear">
       <div class="conLf left">
          <!--博主信息-->
          <div class="lfCon userInfo left">
            <p class="headImg"><img src="../assets/images/photo.png" alt="头像" /></p>
            <p class="hei blogger"><span>博主:</span> <span class="cor blogName">StarFire_xm</span></p>
            <p class="hei blogger"><span>被关注:</span> <span class="cor focus">0</span></p>
            <p class="hei blogger"><span>被赞:</span> <span class="cor focus">0</span></p>
            <p class="hei blogger"><span>被访问:</span> <span class="cor lookPv">0</span></p>
            <p class="hei blogger"><span>联系(qq,wx):</span> <span class="cor lookPv">1123360735</span></p>
            <p class="PlayTour clear">
              <span>微信打赏:</span>
              <img src="../assets/images/wxrwm.png" alt="二维码" />
            </p>
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
          <!--技能分类-->
          <div class="lfCon blogType left">
              <p class="blogCl">分类</p>
              <ul class="blogClList">
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
                <li><i>.</i>全部博文(<span class="allNums">100</span>)</li>
              </ul>
          </div>
       </div>
       <div class="dynamicType left">
         <ul class="typeName clear">
           <li class="jottings" :class="{cur:dynamicTypeCur==0}"  @click="dynamicType(0)">最新笔录</li>
           <li class="newSkill"  :class="{cur:dynamicTypeCur==1}"  @click="dynamicType(1)">技能快讯</li>
           <li class="wordDec"  :class="{cur:dynamicTypeCur==2}" @click="dynamicType(2)">留言动态</li>
           <li class="tools"  :class="{cur:dynamicTypeCur==3}"  @click="dynamicType(3)">推荐工具</li>
         </ul>
         <div class="contentsForType">
           <ul class="contentList">
             <li class="zxbl">
               <div class="cons">
                 <p class="titles">
                    <span class="intro">笔录标题</span>
                    <span class="creatTime right">20180118</span>
                 </p>
                 <p class="Summarys">
                   <a class="sum_con">摘要内容</a>
                 </p>
               </div>
             </li>
           </ul>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import NewDigest from './content/newDigest'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
      }       
    };
  },
  components:{
    'v-newDigest':NewDigest,
     swiper,  
     swiperSlide 
  },
  methods: {
    dynamicType(index){
      this.dynamicTypeCur=index;
    },
    // swiper() {
    //     return this.$refs.carouselsSwiper.swiper;
    // }
  },
  mounted () {
    // this.swiper();
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/minxin';
.homePage{
  width:1200px;
  margin:0 auto;
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
        }
        
      }
    }
  }

}
</style>
