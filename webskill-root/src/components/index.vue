<!--
首页
-->
<template>
  <div class="homePage row">
    <div class="temp_01 clear row">
      <transition enter-active-class="fadeInLeft" leave-active-class="fadeInLeft">
        <!--最新摘要-->
        <div class="newDigest col-lg-3 col-md-4 col-xs-12 col-sm-5" v-show="animationShow">
          <!-- <p class="stitle">
            <span>最新摘要</span>
          </p>
          <v-newDigest></v-newDigest> -->
          <p class="stitle ">
            <span>云标签</span>
          </p>
          <v-cloudTag></v-cloudTag>
        </div>
      </transition>
      <!--广告轮播-->
      <transition enter-active-class="fadeInRight" leave-active-class="fadeInRight">
        <div class="carousels col-lg-9 col-md-8 col-sm-7 pull-left" v-show="animationShow">
          <swiper :options="swiperOption" ref="carouselsSwiper">
            <swiper-slide>
              <li><a title="StarFire_xm的博客"><img src="/webskill/images/starfire.png" alt=""></a></li>
            </swiper-slide>
            <swiper-slide>
              <li><a title="点我吐槽" href="/leaveword" target="_blcank"><img src="/webskill/images/tucao.png" alt=""></a></li>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </transition>
    </div>
    <div class="mainCon clear row">
      <transition enter-active-class="fadeInLeft" leave-active-class="fadeInLeft">
        <div class="conLf left col-lg-3 col-sm-4 col-xs-12" v-show="animationShow">
          <!--博主信息-->
          <div class="lfCon userInfo left col-lg-10 col-sm-12 col-xs-12">
            <div class="heipad col-lg-offset-1 col-sm-offset-1">
              <p class="headImg"><img src="/webskill/images/photo.png" alt="头像" /></p>
              <p class="hei blogger"><span>博主:</span> <span class="cor blogName">StarFire_xm</span></p>
              <p class="hei blogger"><span>职业:</span> <span class="cor lookPv">前端工程师</span></p>
              <p class="hei blogger"><span>兴趣:</span> <span class="cor focus">技术,运动</span></p>
              <p class="hei blogger"><span>联系:</span> <span class="cor lookPv">请留言</span></p>
              <p class="hei blogger"><span>格言:</span> <span class="cor focus">择需,取上态而为之</span></p>
              <!-- <p class="PlayTour clear">
                <span>微信打赏:</span>
                <img src="http://mxm.static.cn/static/images/wxrwm.png" alt="二维码" />
              </p> -->
            </div>
          </div>
          <!--技能分类-->
          <div class="lfCon blogType left col-lg-10 col-sm-12 col-xs-12">
            <p class="blogCl">博客简介</p>
            <p class="conTxt">
              前端博客(zshom.com),关注各类技术走向,探讨技术与分享学习。本博客因初次成型,不足点较多,若有优化等提议欢迎来件. 欢迎您的加入！
            </p>
            <!-- <ul class="blogClList">
                <li><i>.</i><span class="conName">全部博文</span>(<span class="allNums">100</span>)</li>
              </ul> -->
          </div>
          <div class="lfCon blogType left col-lg-10 col-sm-12 col-xs-12">
            <p class="blogCl">快速通道案</p>
            <div class="conTxt">
                <p>
                  <a href="http://www.cyberpolice.cn/" target="_blank">网络110报警服务</a>
                </p>
                <p>
                    <a href="http://www.12377.cn/" target="_blank"><span>中国互联网举报中心</span></a>
                </p>     
                <p>
                    <a href="http://www.bjjubao.org/" target="_blank">北京互联网违法和不良信息举报中心</a>
                </p>
            </div>
          </div>
          <!--最新访客-->
          <!-- <div class="lfCon visitors left col-lg-10 col-sm-12 col-xs-12">
              <p class="titV">最新访客</p>
              <ul class="vList">
                <li><img class="vPhoto" src="http://mxm.static.cn/static/images/defaPhoto.png" alt="pho"><span class="vName">访客1</span><span class="vTime">20180118</span></li>
              </ul>
          </div> -->
        </div>
      </transition>
      <transition enter-active-class="fadeInRight" leave-active-class="fadeInRight">
        <div class="dynamicType left col-lg-9 col-sm-8 col-xs-12" v-show="animationShow">
          <ul class="typeName clear">
            <li class="jottings col-sm-2 col-xs-2" :class="{cur:dynamicTypeCur==0}" @click="dynamicType(0)">全部笔录</li>
            <li class="newSkill col-sm-2 col-xs-2" :class="{cur:dynamicTypeCur==1}" @click="dynamicType(1)">技能快讯</li>
            <li class="wordDec col-sm-2 col-xs-2" :class="{cur:dynamicTypeCur==2}" @click="dynamicType(2)">推荐工具</li>
            <li class="tools col-sm-2 col-xs-2" :class="{cur:dynamicTypeCur==3}" @click="dynamicType(3)">互动专区</li>
            <li class="searchs col-sm-2 col-xs-2" :class="{cur:dynamicTypeCur==4||dynamicTypeCur==5}" @click="dynamicType(4)">搜索导航</li>
          </ul>
          <div class="contentsForType clear">
            <div class="contentList clear">
              <!--全部笔录-->
              <!-- <transition-group  enter-active-class="fadeIn" leave-active-class="fadeIn" @before-enter="beforeEnter"> -->
              <div v-if="dynamicDataList.length>0">
                <!--搜索导航-->
                <div class="search" v-if="dynamicTypeCur==5">
                    <input type="text" name="" v-model="searchCon" id="searchCon" placeholder="输入您要搜索的内容" />
                    <span class="searchSubmit" @click="searchDetail()" @keyup.13="searchDetail()"></span>
                </div>
                <ul>
                    <li class="zxbl" v-for="(item,index) in dynamicDataList" :key="index" :arid="item.newNoteId" :animate-delay="(0.3*index)"
                    :animate-duration="0.5">
                    <div class="cons">
                      <p class="titles">
                        <!-- <a class="intro" target="_blank" :href="'/post?id='+item.newNoteId">{{item.newNoteTitle}}</a> -->
                        <!-- <span class="left noteType">{{item.newNoteType|newNoteTypeFilter}}</span> -->
                        <router-link v-if="dynamicTypeCur==3"  :to="'/interact/'+item.newNoteId" target="_blank" class="intro" v-html="newNoteContSlice(item.newNoteTitle,28)"></router-link>
  
                        <router-link v-else :to="'/post/'+item.newNoteId" target="_blank" class="intro" v-html="newNoteContSlice(item.newNoteTitle,28)"></router-link>

                        <span class="creatTime right">{{item.newNoteTime}}</span>
                      </p>
                      
                      <div class="Summarys" v-if="item.newNoteType==1">
                        <div class="sum_con">
                          <div v-html="newNoteContSlice(item.newNoteConts,117)"></div>
                        </div>
                        <!-- <span>[阅读全部]</span> -->
                      </div>
                      <p class="newAuthor text-right">
                          {{item.newNoteAuthor}}
                        </p>
                    </div>
                  </li>
                </ul>
                
              </div>
              <!-- </transition-group> -->
              <!--互动专区-->
              <!-- <div class="wordDynamic clear"  v-else-if="dynamicTypeCur==2">
                <a class="goLeaveWords blink" href="/leaveword" target="_blank">我要留言</a>
              </div> -->
               <!--搜索导航-->
               <div class="search" v-if="dynamicTypeCur==4">
                  <input type="text" name="" v-model="searchCon" id="searchCon" placeholder="输入您要搜索的内容" />
                  <span class="searchSubmit" @click="searchDetail()" @keyup.13="searchDetail()"></span>
              </div>
             
              <!--敬请期待-->
              <div v-if="dynamicDataList.length==0&&dynamicTypeCur!=4" enter-active-class="bounceIn" leave-active-class="bounceIn">
                <!--搜索导航-->
                <div class="search" v-if="dynamicTypeCur==5">
                    <input type="text" name="" v-model="searchCon" id="searchCon" placeholder="输入您要搜索的内容" />
                    <span class="searchSubmit" @click="searchDetail()" @keyup.13="searchDetail()"></span>
                </div>
                <p v-show="dynamicDataList.length==0" class="noCons">暂 无 数 据！</p>
              </div>
            </div>
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
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  import Pagebar from '../components/unit/table-pagebar'
  import {
    mapGetters,
    mapActions
  } from "vuex"
  export default {
    name: "index",
    data() {
      return {
        msg: "首页内容",
        dynamicTypeCur: 0,
        searchCon: "",
        swiperOption: {
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          autoplay: true, //自动滚动
          loop: true,
          notNextTick: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
        },
        pageModel: {
          url: "/webskill/newestNote",
          dynamicTypeCur: 0,
          limit:8,
          cur: 1,
          searchCon: "",
          againPost: 0
        },
        animationShow: false
        // pageModelUrl:"/static/ajaxpage.json"
      };
    },
    components: {
      // 'v-newDigest':NewDigest,
      'v-cloudTag': CloudTag,
      swiper,
      swiperSlide,
      Pagebar
    },
    filters: {
      //文章类型分类
      newNoteTypeFilter: function (type) {
        if (type == 1) {
          return "技能快讯"
        }
      }
    },
    created() {
      // if(this.wapOrPc=="wap"){

      // }
    },
    methods: {
      ...mapActions(['setAalertMsgFn']),
      newNoteContSlice: function (con, len) {
        con = con.replace(/<\/?[^>]*>/g, '').replace(/\n[\s| | ]*\r/g, '\n').replace(/&nbsp;/ig, '');
        if (!con.length) {
          return con = "<a class='readAll'>[阅读全部]</a>"
        } else if (con.length > len) {
          return con.slice(0, len) + '...';
        } else {
          return con;
        }
      },
      beforeEnter(el) {
        var delay = el.getAttribute('animate-delay'),
          duration = el.getAttribute('animate-duration');
        var cssObj = {
          "animation-delay": delay + 's',
          "-webkit-animation-delay": delay + 's',
          "animation-duration": duration + 's',
          "-webkit-animation-duration": duration + 's',
          "visibility": "visible"
        }
        var getCssText = function (obj) {
          var text = [];
          for (var o in obj) {
            text.push(o + ":" + obj[o])
          }
          return text.join(';')
        }
        el.style.cssText = getCssText(cssObj);
      },
      dynamicType(index) {
        this.pageModel.dynamicTypeCur = this.dynamicTypeCur = index;
        if (index == 5) {
          this.pageModel.searchCon = this.searchCon.replace(/\s/g, "").toLowerCase();
        }else{
          this.searchCon = "";
        }
        if(index == 3){
          this.pageModel.url = "/webskill/leaveWordInteract";
        }else{
          this.pageModel.url = "/webskill/newestNote";
        }
        this.pageModel.againPost++;
      },
      searchDetail() {
        if (this.searchCon.replace(/\s/g, "")) {
          this.dynamicType(5);
        } else {
          this.setAalertMsgFn("请输入查询内容");
        }
      }
      // swiper() {
      //     return this.$refs.carouselsSwiper.swiper;
      // }

    },
    mounted() {
      this.animationShow = true;
    },
    computed: {
      ...mapGetters(['dynamicDataList', 'wapOrPc'])
    }
  };

</script>

<style lang="scss" scoped>
  @import '../assets/css/minxin';
  @import '../assets/css/animation';
  .homePage {
    margin-left: 0;
    margin-right: 0;
    .temp_01 {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 38px;
      background: #fff;
      .newDigest {
        .stitle {
          padding-bottom: 5px;
          border-bottom: 1px solid #ccc;
          margin-bottom: 8px;
          span {
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            font-weight: 700;
            margin-left: 15px;
          }
        }
      }
      .carousels {
        margin: 0;
        padding: 0;
        height: 275px;
        .swiper-container {
          width: 100%;
          height: 100%;
          .swiper-wrapper,
          .swiper-slide {
            height: 100%;
            li {
              height: 100%;
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        ul {
          height: 100%;
          li {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .mainCon {
      .conLf {
        .lfCon {
          margin-bottom: 15px;
        }
      }
      .userInfo {
        // background: url("/webskill/images/bloogerBg.png") no-repeat 0 0;
        background: #fff;
        padding-bottom: 23px;
        border: 1px solid #e6e6e6;
        .heipad {
          padding-top: 15px;
        }
        .headImg {
          width: 60px;
          height: 60px;
          margin: 10px auto;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .hei {
          height: 30px;
          line-height: 30px;
          font-size: .14rem;
        }
        .PlayTour {
          margin: 15px auto;
          span {
            display: inline-block;
            font-size: .14rem;
            margin-bottom: 8px;
          }
          img {
            width: 100px;
            height: 100px;
          }
        }
        .blogger {
          .cor {
            color: #0366d6;
          }
          .blogName {}
        }
      }
      .visitors {
        border: 1px solid #ccc;
        padding: 10px !important;
        .titV {
          color: #000;
        }
        .vList {
          margin-top: 10px;
          li {
            height: 20px;
            line-height: 20px;
            font-size: .14rem;
            .vPhoto {
              width: 15px;
              height: 15px;
              vertical-align: middle;
            }
            .vName {
              margin-left: 7px;
              color: #4b7318;
            }
            .vTime {
              float: right;
            }
          }
        }
      }
      .blogType {
        padding: 10px !important;
        background: #fff;
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid #e6e6e6;
        .blogCl {
          font-size: .15rem;
          color: #000;
        }
        .conTxt {
          margin-top: .12rem;
          line-height: .24rem;
          font-size: .14rem;
        }
        .blogClList {
          margin-top: 10px;
          li {
            height: 20px;
            line-height: 20px;
            font-size: .14rem;
            .conName {
              margin-left: 5px;
            }
          }
        }
      }
      .dynamicType {
        // background: url("/webskill/images/indexBgW3.png") center center;
        background: #fff;
        .typeName {
          padding: .05rem 0;
          border-bottom: 1px solid #e8e8e8;
          li {
            display: inline-block;
            font-size: .17rem;
            float: left;
            text-align: center;
            color: #000;
            cursor: pointer;
            min-width: 60px;
            padding-bottom: 2px;
            &:hover{
                border-bottom: 2px solid #5eaeef;
                color: #5eaeef !important;
            }
          }
          li.cur {
            border-bottom: 2px solid #5eaeef;
            color: #5eaeef !important;
          }
        }
        .contentsForType {
          font-size: .17rem;
          background: #fff;
          .contentList {
            padding: 8px 0px;
            ;
            .noCons {
              font-size: .18rem;
              color: #19b77e;
              text-align: center;
            }
            .zxbl {
              &:hover {
                // background: #e2e9e1;
                box-shadow: 2px 2px 8px rgba(0, 0, 0, .2);
                border-color: #d6d6d6;
              }
              .cons {
                margin: 0 0 0 23px;
                padding-bottom: 25px;
                border-bottom: 1px dashed #ccc;
                padding-right: 24px;
                position: relative;
                .titles {
                  padding-top: 25px;
                  margin-bottom: 8px;
                  width: 100%;
                  .intro {
                    cursor: pointer;
                    display: inline-block;
                    max-width: 65%;
                    color: #2d64b3;
                    font-size: .16rem;
                    text-decoration: none;
                    &:hover {
                      color: #e80d06;
                      text-decoration: underline;
                    }
                  }
                  .creatTime{
                    color: #bdbdbd;
                    font-size: .14rem;
                    float: right;
                  }
                }
                .Summarys {
                  .sum_con {
                    display: block;
                    font-size: .14rem;
                    word-wrap: break-word;
                    &:hover {
                      color: #333;
                    }
                  }
                }
                .newAuthor{
                  color: #bdbdbd;
                  font-size: .14rem;
                  margin-top: 15px;
                }
              }
            }
            .search {
              position: relative;
              display: inline-block;
              margin-bottom: 15px;
              #searchCon {
                display: inline-block;
                width: 205px;
                height: 27px;
                line-height: 27px;
                border: 1px solid #ccc;
                padding-left: 8px;
                background-image: url(/webskill/images/icon_my.png);
                background-repeat: no-repeat;
                background-position: 180px -184px;
                padding-right: 30px;
              }
              .searchSubmit {
                display: inline-block;
                font-size: .12rem;
                cursor: pointer;
                text-align: center;
                color: #000;
                border-radius: 3px;
                padding: 3px 8px;
                position: absolute;
                right: 0;
                top: 0;
                width: 33px;
                height: 27px;
                &:hover {
                //   background: #5d9fec;
                //   color: #fff;
                }
              }
            }
            .wordDynamic {
              .goLeaveWords {
                display: inline-block;
                cursor: pointer;
                color: #1EC965;
              }
            }
          }

        }
      }
    }
  }

  /* @media (max-width: 993px) {
   .homePage .mainCon .dynamicType .typeName li{
    font-size: 14px;
  }
  .contentsForType .intro{
    font-size: 14px;
  }
  .contentsForType .sum_con{
    font-size: 14px !important;
  }
} */

  @media (max-width: 767px) {
    .homePage .mainCon .userInfo .heipad {
      text-align: center;
    }
  }

  /* @media (max-width: 630px) {
  .top .topType .alinks .logo span{
    font-size:15px;
  }
  .homePage .mainCon .dynamicType .typeName li{
    font-size: 14px;
  }
  .contentsForType .intro{
    font-size: 14px;
  }
  .contentsForType .sum_con{
    font-size: 14px !important;
  }
  
} */

  /* @media (max-width: 512px) {
//   .homePage .mainCon .dynamicType .typeName li{
//     font-size: 12px;
//   }
//   .contentsForType .intro{
//     font-size: 12px;
//   }
//   .contentsForType .sum_con{
//     font-size: 11px !important;
//   }
     .noCons,.goLeaveWords{
       font-size: 12px !important;
     }
} */

</style>
