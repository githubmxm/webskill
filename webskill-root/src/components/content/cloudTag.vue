<!--
云标签
-->
<template>
<div id="box">
    <ul class="newDigest clear">
      <li class="digList textrotate">
        <a href="/articlelist/Js" target="_blank">Js</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Js" target="_blank">H5</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Css" target="_blank">Css</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Ejs" target="_blank">Ejs</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Vue" target="_blank">Vue</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Php" target="_blank">Php</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Html" target="_blank">Html</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Java" target="_blank">Java</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Ubb" target="_blank">Ubb</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Xss" target="_blank">Xss</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Json" target="_blank">Json</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Http" target="_blank">Http</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Jquery" target="_blank">Jquery</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/NodeJs" target="_blank">NodeJs</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/BootStrap" target="_blank">BootStrap</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/MongoDb" target="_blank">MongoDb</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Express" target="_blank">Express</a>
      </li>
      <li class="digList textrotate">
        <a href="/articlelist/Reactjs" target="_blank">Reactjs</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Angular" target="_blank">Angular</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/Requirejs" target="_blank">Requirejs</a>
      </li>
      <li class="digList textrotate">
        <a href="/articlelist/Seajs" target="_blank">Seajs</a>
      </li>
      <li class="digList textrotate">
        <a href="/articlelist/Ueidtor" target="_blank">Ueidtor</a>
      </li>
      <li class="digList textrotate">
        <a href="/articlelist/Swiper" target="_blank">Swiper</a>
      </li>
      <li class="digList textrotate">
        <a href="/articlelist/Github" target="_blank">Github</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/EasyUi" target="_blank">EasyUi</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/JqueryUi" target="_blank">JqueryUi</a>
      </li>
      <li class="digList textrotate">
          <a href="/articlelist/TouchJs" target="_blank">TouchJs</a>
      </li>
      <li class="digList textrotate">
        <a href="/articlelist/性能" target="_blank">性能</a>
      </li>
      <li class="digList textrotate">
        <a href="/articlelist/typescript" target="_blank">typescript</a>
      </li>
      
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "cloudTags",
  data() {
    return {
      msg: "云标签"
    };
  },
  methods: {
  },
  components: {

  },
  mounted() {
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
    padding: 8px 0;
    background: url("../../assets/images/indexBgW.png") center center;
    overflow: hidden;
    .digList {
      font-size: .13rem;
      color: #2e7cb6;
      display: inline-block;
      padding: 5px 0px;
      text-align: center;
      text-transform: uppercase;
      .digType {
        color: rgb(115, 60, 218);
      }
      a{
        font-size: .13rem;
      color: #2e7cb6;
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
@media (max-width: 415px) {
  .newDigest{
    margin-bottom: 15px;
  }
}
</style>

