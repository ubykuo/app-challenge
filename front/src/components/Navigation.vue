<template>
  <header>
    <router-link class="main-title" to="/">Music Room</router-link>
    <div class="search" @click="toggle">
      <i class="fa fa-search fa-2x"></i>
    </div>
    <slot v-if="showNav"></slot>
  </header>
</template>

<script>
  export default {
    name: 'Navigation',
    data () {
      return {
        showNav: false
      }
    },
    mounted () {
      this.$on('toggleNav', () => {
        debugger
        this.toggle()
      })
    },
    methods: {
      toggle () {
        this.showNav = !this.showNav
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/variables.scss';
  @import url('https://fonts.googleapis.com/css?family=Lobster');

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .search {
    i {
      color: $secondary;
    }
  }

  .overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: $background;
    opacity: 0.95;
    top: 0;
    left: 0;
  }

  .main-title {
    font-family: 'Lobster', sans-serif;
    color: $secondary;
    font-size: 2em;
  }
</style>
