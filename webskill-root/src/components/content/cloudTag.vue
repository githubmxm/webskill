<!--
云标签
-->
<template>
<div id="box">
    <ul class="newDigest clear">
      <li class="digList textrotate">
        Js
      </li>
      <li class="digList textrotate">
        Css
      </li>
      <li class="digList textrotate">
        Html
      </li>
      <li class="digList textrotate">
        Jquery
      </li>
      <li class="digList textrotate">
        Bootstrap
      </li>
      <li class="digList textrotate">
        Nodejs
      </li>
      <li class="digList textrotate">
        Java
      </li>
      <li class="digList textrotate">
        Php
      </li>
      <li class="digList textrotate">
        MongoDb
      </li>
      <li class="digList textrotate">
        Express
      </li>
      <li class="digList textrotate">
        Reactjs
      </li>
      <li class="digList textrotate">
        Angularjs
      </li>
      <li class="digList textrotate">
        Ejs
      </li>
      <li class="digList textrotate">
        Requirejs
      </li>
      <li class="digList textrotate">
        Seajs
      </li>
      <li class="digList textrotate">
        Vue
      </li>
      <li class="digList textrotate">
        Ueidtor
      </li>
      <li class="digList textrotate">
        Swiper
      </li>
      <li class="digList textrotate">
        Github
      </li>
      <li class="digList textrotate">
        Xss
      </li>
      <li class="digList textrotate">
        EasyUi
      </li>
      <li class="digList textrotate">
        JqueryUi
      </li>
      <li class="digList textrotate">
        Ubb
      </li>
      <li class="digList textrotate">
        Json
      </li>
      <li class="digList textrotate">
        Touch.js
      </li>
      <li class="digList textrotate">
        http
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
      font-size: 13px;
      color: #2e7cb6;
      display: inline-block;
      padding: 5px 10px;
      text-align: center;
      text-transform: uppercase;
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
@media (max-width: 415px) {
  .newDigest{
    margin-bottom: 15px;
  }
}
</style>

