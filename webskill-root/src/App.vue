<template>
  <div id="app">
    <div class="main_blog">
      <v-top v-if="topView"></v-top>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Top from '@/components/top';
export default{
  data () {
    return {
      topView:true
    }
  },
  methods: {
    
  },
  mounted () {
    if(location.pathname=="/"){
      this.topView=false
    }
  },
  components: {
    'v-top':Top
  }
}
</script>
<style lang="scss">
@import './assets/css/common.scss';
</style>