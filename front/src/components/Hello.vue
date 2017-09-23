<template>
  <div>
    <navigation></navigation>
    <div class="header-container">
      <div class="header">
        <h1>All the rooms</h1>
        <room-button :on-click="myRoom">My Room</room-button>
      </div>
    </div>
    <room-list :my-room="myRoom" :rooms="rooms"></room-list>
  </div>
</template>

<script>
  import Navigation from './Navigation'
  import RoomList from './RoomList'
  import RoomButton from './RoomButton'

  export default {
    name: 'hello',
    data () {
      return {
        rooms: []
      }
    },
    components: {Navigation, RoomList, RoomButton},
    methods: {
      myRoom () {
        const username = this.$localStorage.get('id')
        this.$router.push(`/room/${username}`)
      }
    },
    created () {
      this.$socket.emit('init')
    },
    socket: {
      events: {
        rooms (currentRooms) {
          this.rooms = currentRooms
        },
        connect () {
          this.$socket.emit('init')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '~@/variables.scss';

  .header-container {
    display: flex;
    align-items: center;
    padding: 0 20px;
    flex-direction: row;
    justify-content: center;
  }

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
