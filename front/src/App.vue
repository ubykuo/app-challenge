<template>
  <div id="app">
    <header>
      <span class="main-title">Music Room</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import '~@/variables.scss';
  @import url('https://fonts.googleapis.com/css?family=Lobster');
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  body {
    margin: 0;
    background-color: $background;
  }

  * {
    font-family: 'Poppins', sans-serif;
    color: $font-primary-color;
  }

  ul {
    list-style: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: $primary;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

  .main-title {
    font-family: 'Lobster', sans-serif;
    color: $secondary;
    font-size: 2em;
  }
</style>
