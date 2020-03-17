<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

html{
  height: 100%;
}
body{
  height: inherit;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: inherit;
  height: inherit;
}
.hello{
  height: inherit;
}
.container{
  height: inherit;
  background-color: #d2d2d2;
  padding-right:0;
  padding-left: 0;
  margin-right: 0;
  margin-left: 0;
  width: 100%;
  text-align: center;
}
.bottom-nav-box{
    position: fixed;
    bottom:0;
    width: inherit;
    background-color: #fff;
  }
  .show-more-row  img{
    width: 16px;
    height: 16px;
    position: relative;
    top: 2px;
  }
</style>
