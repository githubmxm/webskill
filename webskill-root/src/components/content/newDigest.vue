<!--
橱窗单行滚动
-->
<template>
<div id="box">
    <ul class="newDigest clear"  ref="newDigest" :class="{anim:animate==true}">
      <li class="digList" v-for="diges in newDegistList" :key="diges.id">
        <span class="digType left">[ {{diges.newDigestType}} ]</span><a class="digCon ellipsis left" href="">{{diges.newDigestCon}}</a> <span class="digetTime">{{diges.newDigestTime}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "newDigest",
  data() {
    return {
      msg: "最新摘要",
      animate:false,
      newDegistList:[]
    };
  },
  created(){
    setInterval(this.scroll,3000);
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
    },
    scroll(){
      let newDigest = this.$refs.newDigest;
      newDigest.style.marginTop='-30px';
      this.animate=!this.animate;
      var that = this; 
      setTimeout(function(){
          that.newDegistList.push(that.newDegistList[0]);
          that.newDegistList.shift();
          try {
             newDigest.style.marginTop='0px';
          } catch (error) {
            
          }
          that.animate=!that.animate;  
      },500)
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    this.getNewDegest()
  }
};
</script>

<style lang="scss" scoped>
#box{
  overflow: hidden;
  transition: all 0.5s;
  .anim{
    transition: all 0.5s;
  }
  .newDigest {
    width: 310px;
    height: 225px;
    background: url("../../assets/images/indexBgW.png") center center;
    overflow: hidden;
    .digList {
      height: 30px;
      line-height: 30px;
      font-size: .14rem;
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
}
</style>

