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
  import config from '../config'

  export default {
    name: 'hello',
    data () {
      return {
        url_base: 'https://accounts.spotify.com/authorize',
        params: {
          client_id: 'da73848fd0704f87a74b4d5d88dc1642',
          response_type: 'code',
          redirect_uri: `${config.BASE_URL}/api/auth/`,
          scopes: encodeURIComponent('playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming ugc-image-upload user-follow-modify user-follow-read user-library-read user-library-modify user-read-private user-read-birthdate user-read-email user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played')
        },
        rooms: []
      }
    },
    components: {Navigation, RoomList, RoomButton},
    created () {
      this.$http.get(`${config.BASE_URL}/api/room/`).then(response => {
        this.rooms = response.body
      })
    },
    methods: {
      myRoom () {
        const username = this.$localStorage.get('username')
        if (!username) {
          window.location.assign(this.authLink)
        } else {
          this.$router.push(`/room/${username}`)
        }
      }
    },
    computed: {
      authLink () {
        return `${this.url_base}?client_id=${this.params.client_id}&response_type=${this.params.response_type}&redirect_uri=${this.params.redirect_uri}&scope=${this.params.scopes}`
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
