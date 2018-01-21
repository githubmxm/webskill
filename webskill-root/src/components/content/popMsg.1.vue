<!--
弹层提示
-->
<template>
  <div class="popMsg" v-show="alertMsgShow">
    <p class="errTit">{{alertMsg}}</p>
    <a class="knowBtn">知道了</a>
  </div>
</template>

<script>
export default {
  name:'popMsg',
  data () {
    return {
      alertMsgShow:false,
      alertMsg:""
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.popMsg{
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -125px 0 0 -200px;
  width: 400px;
  height: 250px;
  z-index: 1000001;
  background: url('../../assets/images/pop_bg.jpg') left top;
  cursor: pointer;
  .errTit{
    text-align: center;
    color: #333;
    font-size: 16px;
    margin-top: 70px;
  }
  .knowBtn{
    margin: 20px auto 0;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    text-align: center;
    font-size: 16px;
    background: #52a8e8;
    border: none;
    display: block;
    color: #fff;
  }
}
</style>


