<template>
  <div class="song-list">
    <ul v-if="songs.length > 0">
      <li v-for="data in songs">
        <song :detail="data" :is-host="isHost" :is-playlist="isPlaylist" :on-select="onSelect"></song>
      </li>
    </ul>
    <div v-else class="no-songs">
      There are no songs
    </div>
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
      },
      isHost: {
        type: Boolean,
        required: true
      },
      isPlaylist: {
        type: Boolean,
        required: false,
        default: true
      },
      onSelect: {
        type: Function,
        required: false,
        default: () => {}
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
    width: 100%;
  }

  .no-songs {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10vh 0;
  }
</style>
