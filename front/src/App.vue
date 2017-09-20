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
  import makeId from './utils/makeId'

  export default {
    name: 'app',
    components: {Navigation},
    created () {
      if (!this.$localStorage.get('id')) {
        this.$localStorage.set('id', makeId())
      }
      console.info(this.$localStorage.get('id'))
    }
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

  main {
    text-align: center;
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
