<!--
云标签
-->
<template>
<div id="box">
    <ul class="newDigest clear">
      <li class="digList textrotate"  v-for="(tag,index) in cloudTags" :key="index">
        <router-link  :to="'/articlelist/'+tag.tagName" target="_blank" class="intro">{{tag.tagName}}</router-link>
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
      msg: "云标签",
      cloudTags:[]
    };
  },
  methods: {
      getCloudTags:function(){
          var _this=this;
          axios({
            method: 'get',
            url: '/webskill/getCloudTags',
          }).then((res) => {
            let d = res.data;
            _this.cloudTags=d.data;
          });
      }
  },
  components: {

  },
  mounted() {
      this.getCloudTags();
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
      margin: 0 3px;
      .digType {
        color: rgb(115, 60, 218);
      }
      a{
        font-size: .13rem;
        color: #2e7cb6;
        &:hover{
            color: red;
        }
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

