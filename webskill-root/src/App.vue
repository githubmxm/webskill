<template>
  <div id="app">
    <div class="main_blog">
      <app-header></app-header>
      <div class="header">
        <router-view name="top"></router-view>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/top'
export default{
  name:"header",
  components: {
     "app-header":AppHeader
  }

}
</script>

<style lang="scss">
@import './assets/css/common.scss';

.main_blog{
  width:1000px;
  overflow: hidden;
  margin:0 auto;
}
</style>