<template>
  <div class="song">
    <!--img :src="imgSrc"
         class="album-cover"
         alt="Album cover" -->

    <div class="detail">
      <h3>{{ detail.snippet.title }}</h3>
      <h4>{{ detail.snippet.channelTitle }}</h4>
    </div>

    <div class="actions" v-if="isPlaylist">
      <div v-if="isHost" class="action" @click="onRemove(detail)">
        <i class="fa fa-2x fa-trash"></i>
      </div>

      <div v-else-if="!hasVoted" class="action"
           @click="onVote(detail)">
        <i class="fa fa-2x fa-thumbs-up"></i>
      </div>
      <div v-else class="action">
        <i class="fa fa-2x fa-check"></i>
      </div>
    </div>
    <div v-else class="actions">
      <div class="action"
           @click="addToPlaylist(detail)">
        <i class="fa fa-2x fa-plus"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import config from '../config'

  export default {
    name: 'Song',
    props: {
      detail: {
        type: Object
      },
      isHost: {
        type: Boolean
      },
      isPlaylist: {
        type: Boolean
      },
      onSelect: {
        type: Function,
        required: false
      }
    },
    computed: {
      imgSrc () {
        return this.detail.snippet.thumbnails[config.CLIENT_ID].default.url
      },
      hasVoted () {
        return false
      }
    },
    methods: {
      onRemove (id) {
        this.$socket.emit('remove', {
          room: this.$route.params.username,
          song: this.song
        })
      },
      onVote (song) {
        this.$emit('vote', {
          user: this.$localStorage.get('id'),
          room: this.$route.params.username,
          song: this.song
        })
      },
      addToPlaylist (song) {
        this.$socket.emit('add-song',
          this.$localStorage.get('id'),
          this.$route.params.username,
          song
        )

        this.onSelect()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/variables.scss';

  h1, h2, h3, p {
    margin: 8px 0;
  }

  h4, h5 {
    margin: 2px 0;
  }

  .song {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: $terciary;
    width: 100%;
  }

  .album-cover {
    height: fit-content;
    padding-left: 10px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0 20px;
    width: 100%;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .votes {
    font-weight: bold;
  }

  .action {
    padding: 20px;
    cursor: pointer;
  }

  img {
    max-width: 80px;
    max-height: 80px;
  }
</style>
