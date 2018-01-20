<template>
  <div class="conDetails">
    <section>
      <article class="conPost">
        <h1 class="title">标题</h1>
        <div class="meta"><span class="creatTime">2018年1月7日</span> <span class="pageViewNum">0</span> 次浏览</div>
        <div class="details">
          
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.conDetails{
  section{
    background: #fcfcfa;
    box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
    .conPost{
      margin-bottom: 20px;
      padding: 30px;
      .title{
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 1.8em;
        font-family: Pmingliu,Mingliu;
        line-height: 1em;
      }
      .meta{
        margin-top: 10px;
        margin-bottom: 15px;
        color: #777;
        font-size: 10px;
        .creatTime{
          margin-bottom: 15px;
          color: #777;
          font-size: 10px;
        }
        .pageViewNum{
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
