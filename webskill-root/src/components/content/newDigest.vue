<template>
  <ul class="newDigest clear">
      <!-- <li class="digList">
        <span class="digType left">[ js ]</span><a class="digCon ellipsis left" href="">等宽高计算</a> <span class="digetTime">20180117</span>
      </li>
      <li class="digList">
        <span class="digType left">[ js ]</span><a class="digCon ellipsis left" href="">等宽高计算</a> <span class="digetTime">20180117</span>
      </li> -->
      <swiper :options="swiperOption2"  ref="newDigestSwiper">
        <swiper-slide v-for="diges in newDegistList" :key="diges.id">
          <li class="digList">
            <span class="digType left">[ {{diges.newDigestType}} ]</span><a class="digCon ellipsis left" href="">{{diges.newDigestCon}}</a> <span class="digetTime">{{diges.newDigestTime}}</span>
         </li>
        </swiper-slide>
        <!-- <swiper-slide>
          <li class="digList">
            <span class="digType left">[ js ]</span><a class="digCon ellipsis left" href="">111</a> <span class="digetTime">111</span>
         </li>
        </swiper-slide>
        <swiper-slide>
          <li class="digList">
            <span class="digType left">[ js ]</span><a class="digCon ellipsis left" href="">111</a> <span class="digetTime">111</span>
         </li>
        </swiper-slide> -->
        <div class="swiper-pagination2" slot="pagination"></div>
      </swiper>
  </ul>
</template>

<script>
import axios from 'axios'
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "newDigest",
  data() {
    return {
      msg: "最新摘要",
      swiperOption2: {
        direction : 'vertical',
        // slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        autoplay:true,//自动滚动
        loop: true,
        notNextTick: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        height:30
      },
      newDegistList:[]
    };
  },
  methods: {
    getNewDegest(){
      let _this=this;
      axios({
        method: 'get',
        url: '/static/newDigets.json'
      }).then((res) => {
        let digests = res.data
        if (digests.status == "success") {
          _this.newDegistList=digests.data;
        }
      })
    }
    // initializeSwiper:function(){
    //   var digets=new swiper('.swiper-pagination2',{})
    // }
    // swiper() {
    //   return this.$refs.newDigestSwiper.swiper;
    // }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    this.getNewDegest()
    // this.swiper().startAutoplay()
    // this.swiper().reLoop()
  }
};
</script>

<style lang="scss" scoped>
.newDigest {
  width: 310px;
  height: 234px;
  padding: 8px 15px;
  background: url("../../assets/images/indexBgW.png") center center;
  overflow: hidden;
  .digList {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    .digType {
      color: rgb(115, 60, 218);
    }
    .digCon {
      width: 165px;
      margin-left: 8px;
      &:hover {
        text-decoration: underline;
        color: #3498db;
      }
    }
    .digetTime {
      float: right;
      color: #ababab;
    }
  }
}
.swiper-slide{
  height:auto !important;
}
</style>

