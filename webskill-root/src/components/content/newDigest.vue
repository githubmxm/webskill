<template>
  <ul class="newDigest clear">
    <li class="digList">
      <span class="digType left">[ js ]</span><a class="digCon ellipsis left" href="">等宽高计算</a> <span class="digetTime">20180117</span>
    </li>
  </ul>
</template>

<script>
export default {
  name:'newDigest',
  data() {
    return {
      msg: "最新摘要"
    };
  },

}
</script>

<style lang="scss" scoped>
.newDigest{
  width:310px;
  height:234px;
  padding:8px 15px;
  .digList{
    height:30px;
    line-height: 30px;
    font-size: 14px;
    color:#fff;
    .digType{
      color: rgb(115, 60, 218)
    }
    .digCon{
      width:165px;
      margin-left: 8px;
      &:hover{
        text-decoration: underline;
        color: #3498db;
      }
    }
    .digetTime{
      float: right;
      color:#ababab;
    }
  }
}
</style>

