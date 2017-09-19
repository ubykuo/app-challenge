<template>
  <div class="player">
    <span><i class="fa fa-2x fa-backward"></i></span>
    <span @click="togglePlay"><i class="fa fa-2x" :class="getPlayingIcon"></i></span>
    <span><i class="fa fa-2x fa-forward"></i></span>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    data () {
      return {
        playing: false
      }
    },
    methods: {
      togglePlay () {
        this.playing = !this.playing
      }
    },
    computed: {
      getPlayingIcon () {
        return this.playing ? 'fa-play' : 'fa-pause'
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
    i {
      color: $secondary
    }

    &:not(:last-child) {
      margin-right: 20px;

    }
  }
</style>
