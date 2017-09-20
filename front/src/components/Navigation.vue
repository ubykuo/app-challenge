<template>
  <header>
    <router-link class="main-title" to="/">Music Room</router-link>
    <div class="search toggle" @click="toggle">
      <i class="fa fa-search fa-2x"></i>
    </div>
    <div :class="{visible: showNav}" class="overlay">
      <div class="header">
        <div class="search-box">
          <input @keyup="onSearch(query)" v-model="query"
                 placeholder="Search for a song..."
                 autofocus />
        </div>
        <div @click="toggle" class=" toggle">
          <i class="fa fa-2x fa-times"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Navigation',
    data () {
      return {
        showNav: false,
        query: ''
      }
    },
    props: {
      onSearch: {
        type: Function,
        required: false
      }
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

  .overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: $background;
    top: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
    transition: all .3s;

    &.visible {
      opacity: 0.95;
      visibility: visible;
    }
  }

  .main-title {
    font-family: 'Lobster', sans-serif;
    color: $secondary;
    font-size: 2em;
  }

  .search-box {
    padding: 15px;
    display: flex;
    align-items: center;
  }

  .toggle {
    cursor: pointer;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    background-color: transparent;
    border-style: none;
    border-bottom: 2px solid white;
    padding: 5px;
    font-size: 1.3em;
  }

  .search {
    i {
      color: $secondary;
    }
  }
</style>
