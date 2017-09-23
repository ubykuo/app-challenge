<template>
  <div id="app">
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
    components: {Navigation},
    created () {
      console.info(this.$localStorage.get('id'))
    }

  }
</script>

<style lang="scss">
  @import '~@/variables.scss';
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  html, body {
    margin: 0;
    min-height: 100%;
    height: 100%;
  }

  body {
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

  main {
    text-align: center;
  }
</style>
