<template>
  <div id="app">
    <navigation></navigation>
    <main>
      <transition>
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  export default {
    name: 'app',
    components: {Navigation}
  }
</script>

<style lang="scss">
  @import '~@/variables.scss';
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  body {
    margin: 0;
    background-color: $background;
  }

  a {
    text-decoration: none;
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
</style>
