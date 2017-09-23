<template>
  <div class="player-container">
    <progress-bar :progress="progress"></progress-bar>
    <div class="player">
      <span class="duration">{{ getCurrentTime }}</span>
      <span @click="onToggle"><i class="fa fa-2x"
                                 :class="getPlayingIcon"></i></span>
      <span @click="forward"><i class="fa fa-2x fa-forward"></i></span>
    </div>
  </div>
</template>

<script>
  import ProgressBar from './ProgressBar'

  export default {
    name: 'Player',
    props: {
      playing: {
        type: Boolean,
        required: true
      },
      progress: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      onToggle: {
        type: Function,
        required: true
      },
      current: {
        type: Number,
        required: true
      }
    },
    components: {ProgressBar},
    methods: {
      forward () {
        this.$socket.emit('next', this.$route.params.username)
      }
    },
    computed: {
      getSongLength () {
        return Math.floor(this.total / 60)
      },
      getSongLengthFixed () {
        return (this.total / 60).toFixed(2)
      },
      getCurrentTime () {
        let minutes = Math.floor(this.current / 60)
        let seconds = Math.floor(this.current) % 60
        let secondsFormat = (seconds > 9) ? seconds : `0${seconds}`
        return `${minutes}:${secondsFormat}`
      },
      getPlayingIcon () {
        return this.playing ? 'fa-pause' : 'fa-play'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/variables.scss';

  .player-container {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    margin: 0;
  }

  .player {
    height: $player-height;
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
  .duration {
    color: $secondary;
    font-weight: bold;
    margin-right: 5px;
  }
</style>
