<template>
  <ul class="rooms" :class="{grid: !empty() }">
    <room-preview v-show="!empty()" v-for="room in rooms"
                  :data="room"></room-preview>
    <div class="no-rooms" v-show="empty()">
      <p>There are no rooms</p>
      <room-button :on-click="myRoom">Go To My Room</room-button>
    </div>
  </ul>
</template>

<script>
  import RoomPreview from './RoomPreview'
  import RoomButton from './RoomButton'

  export default {
    name: 'RoomList',
    components: {RoomPreview, RoomButton},
    props: {
      rooms: {
        type: Array,
        required: true
      },
      myRoom: {
        type: Function,
        required: false
      }
    },
    created () {
    },
    methods: {
      empty () {
        return this.rooms.length === 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  $room-box: 1fr;

  .rooms {
    padding: 0 20px;

    &.grid {
      display: grid;
      grid-auto-rows: 30vw;
      grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
      grid-gap: 20px;
      max-width: 100vw;
    }
  }

  .no-rooms {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: scale(1.25);
    height: 50vh;

    &:first-child {
      margin-bottom: 10px;
    }
  }
</style>
