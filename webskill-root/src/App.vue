<template>
  <div id="app">
    <div class="main_blog">
      <v-top v-if="publicView"></v-top>
      <router-view></router-view>
    </div>
    <v-footer v-if='publicView'></v-footer>
  </div>
</template>
<script>
import Top from '@/components/top';
import Footer from '@/components/footer';

export default{
  data () {
    return {
      publicView:true
    }
  },
  methods: {
    
  },
  mounted () {
    if(location.pathname=="/login"){
      this.publicView=false
    }
  },
  components: {
    'v-top':Top,
    'v-footer':Footer
  }
}
</script>
<style lang="scss">
@import './assets/css/common.scss';
</style>