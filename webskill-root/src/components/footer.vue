<!--
页脚
-->
<template>
  <footer>
    <p>
     <a href="/about" target="_blank">关于我们</a>
     <a href="/privacy" target="_blank">版权隐私</a>
     <br/>
     <a href="http://www.miitbeian.gov.cn" target="_blank">浙ICP备15005896号-1</a>
     <span>技百讯版权所有</span>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
  footer{
    line-height: .28rem;
    text-align: center;
    margin-top: 30px;
    background: #dcdcdc;
    padding: 12px 0;
    p{
      font-size:12px;
      color:#333;
      a{
        display: inline-block;
        margin: 0 5px;
        padding: 0;
        height: 30px;
        line-height: 30px;
        &:hover{
          color:#3498db;
        }
      }
    }
  }
</style>

