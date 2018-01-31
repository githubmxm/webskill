<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
    },
    methods: {
      getUEContent() { // 获取内容方法
      	var expDelStr = new RegExp("java|script|ajax|\\.post|\\.get|\\$|jquery|\\.js|document|write|eval|iframe|frame|alert|console","gi");  //脚本有关单词
        return this.editor.getContent().replace(expDelStr,"")
      },
      clearContent(uec){//清除内容
        this.editor.setContent('');
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
