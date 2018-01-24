<!--
页脚
-->
<template>
  <footer>
    <p>
     <a href="/about" target="_blank">关于我们</a>
     <a href="/privacy" target="_blank">版权隐私</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
  footer{
    text-align: center;
    margin-top: 0 10px;;
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

