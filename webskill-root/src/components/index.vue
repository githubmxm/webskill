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
     <div class="mainCon clear">
       <div class="userInfo left">
         <p class="headImg"><img src="../assets/images/photo.png" alt="头像" /></p>
         <p class="hei blogger"><span>博主:</span> <span class="cor blogName">StarFire</span></p>
         <p class="hei blogger"><span>被关注:</span> <span class="cor focus">0</span></p>
         <p class="hei blogger"><span>被赞:</span> <span class="cor focus">0</span></p>
         <p class="hei blogger"><span>被访问:</span> <span class="cor lookPv">0</span></p>
         <p class="hei blogger"><span>联系方式(QQ,WX):</span> <span class="cor lookPv">1123360735</span></p>
         <p class="PlayTour clear">
           <span>打赏支持:</span>
           <img src="../assets/images/wxrwm.png" alt="二维码" />
         </p>
       </div>
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
  .mainCon{
    .userInfo{
      width: 322px;
      padding: 10px 30px;
      border: 1px solid #ccc;
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
  }

}
</style>
