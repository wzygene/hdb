<template>
  <div id="app">
    <div class="content-wrapper">
      <router-view keepalive></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped >
html, body{
  position: relative; height: 100%;
}
#app{
  height: 100%;
  @media screen and (max-width: 1600px) {
    .content-wrapper{
      margin-top: 70px;
      margin-left: 183px;
    }
  }
  @media screen and (min-width: 1601px) {
    .content-wrapper{
      margin-top: 97px;
      margin-left: 183px;
    }
  }
}
</style>
