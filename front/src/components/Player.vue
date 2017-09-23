<template>
  <div class="player">
    <span @click="togglePlay"><i class="fa fa-2x" :class="getPlayingIcon"></i></span>
    <span @click="forward"><i class="fa fa-2x fa-forward"></i></span>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    props: {
      playing: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      togglePlay () {
        this.playing = !this.playing
      },
      forward () {
        debugger
        this.$socket.emit('next', this.$route.params.username)
      }
    },
    computed: {
      getPlayingIcon () {
        return this.playing ? 'fa-pause' : 'fa-play'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/variables.scss';

  .player {
    position: fixed;
    height: $player-height;
    width: 100%;
    left: 0;
    bottom: 0;
    margin: 0;
    background-color: $terciary;
    box-shadow: 0px -5px 15px 0px $background;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    width: 30px;
    cursor: pointer;
    i {
      color: $secondary
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
</style>
