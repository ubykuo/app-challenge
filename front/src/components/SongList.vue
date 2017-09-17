<template>
  <div class="song-list">
    <ul>
      <li v-for="data in songs">
        <song :detail="data"></song>
      </li>
    </ul>
  </div>
</template>
<script>
  import Song from './Song'

  export default {
    name: 'SongList',
    components: {Song},
    props: {
      songs: {
        type: Array,
        required: true
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/variables.scss';

  ul {
    width: 100%;
    padding: 0;
  }

  li {
    margin-bottom: 15px;
  }

  .song-list {
    display: flex;
    flex-direction: row;
    margin-bottom: $player-height + 20px;
  }
</style>
