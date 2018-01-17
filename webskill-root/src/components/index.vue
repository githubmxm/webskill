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
        <div class="carousels left"></div>
     </div>
  </div>
</template>

<script>
import NewDigest from './content/newDigest'
export default {
  name: "index",
  data() {
    return {
      msg: "首页内容"
    };
  },
  components:{
    'v-newDigest':NewDigest
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
      background: red;
    }
  }

}
</style>
