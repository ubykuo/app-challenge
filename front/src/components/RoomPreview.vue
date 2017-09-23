<template>
  <li class="room-preview" @click="onClick">
    <div class="cover" :style="{backgroundColor}">
      <h2>{{data.room_id}}</h2>
    </div>
  </li>
</template>

<script>
  import randomColor from 'randomcolor'

  export default {
    name: 'RoomPreview',
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    beforeCreate () {
      this.backgroundColor = randomColor({luminosity: 'light'})
    },
    data () {
      return {
        styleObject: {
          backgroundColor: this.backgroundColor
        }
      }
    },
    methods: {
      onClick () {
        this.$router.push(`/room/${this.data.room_id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .room-preview {
    height: 100%;
    align-self: stretch;
    width:100%;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  .cover {
    height: 100%;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
  }
</style>
