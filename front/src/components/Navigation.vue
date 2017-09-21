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
      <div class="results">
        <h2>Search results</h2>
        <song-list
          :songs="songs"
          :is-host="false"
          :is-playlist="false">
        </song-list>
      </div>
    </div>
  </header>
</template>

<script>
  import SongList from './SongList.vue'

  export default {
    components: {SongList},
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
      },
      songs: []
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
    width: 100%;
    height: 100%;
    background-color: rgba(6,3,44,0);
    top: 0;
    left: 0;
    visibility: hidden;
    transition: all .3s;

    &.visible {
      background-color: rgba(6,3,44,0.95);
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

  .results {
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
