<template>
  <div class="conDetails">
    <section>
      <article class="conPost">
        <h1 class="title">请输入您的留言:</h1>
        <div class="details">
          <div class="editor-container">
            <UE :defaultMsg=defaultMsg :config=config :id=ue2 ref="ue2"></UE>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import UE from './ue/ue';
export default {
  data () {
    return {
       defaultMsg: '',
        config: {
          initialFrameWidth: null,
          //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
          toolbars:[['test','emotion']],
          //focus时自动清空初始化时的内容
          autoClearinitialContent:true,
          maximumWords:300,
          pasteplain:true,
          //关闭字数统计
          wordCount:true,
          enableAutoSave:false,
          //关闭elementPath
          elementPathEnabled:false,
          //默认的编辑区域高度
          initialFrameHeight:200,
          //更多其他参数，请参考ueditor.config.js中的配置项
          serverUrl: '/server/ueditor/controller.php'
        },
        ue2: "ue2"
    }
  },
  components: {
    UE
  },
  methods: {
      //获取编辑器内容
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      }
  }
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
        margin-bottom: 15px;
        font-weight: bold;
        font-size: 18px;
        font-family: Pmingliu,Mingliu;
      }
      .details{
        width:950px;
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
