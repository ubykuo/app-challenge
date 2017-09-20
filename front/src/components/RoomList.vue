<template>
  <ul class="rooms">
    <room-preview v-for="room in rooms" :key="room.owner.spotify_id" :data="room"></room-preview>
  </ul>
</template>

<script>
  import RoomPreview from './RoomPreview'
  export default {
    name: 'RoomList',
    components: {RoomPreview},
    props: {
      rooms: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  $room-box : 1fr;

  .rooms {
    padding: 0 20px;
    display: grid;
    grid-auto-rows: 30vw;
    grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
    grid-gap: 20px;
    max-width: 100vw;
  }
</style>
