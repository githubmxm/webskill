<template>
  <div id="app">
    <div class="main_blog">
      <div class="header">
        <router-view name="top"></router-view>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>


<style lang="scss">
@import './assets/css/common.scss';

.main_blog{
  width:1000px;
  overflow: hidden;
  margin:0 auto;
}
</style>