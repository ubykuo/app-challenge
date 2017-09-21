<template>
  <div>
    <navigation></navigation>
    <div class="header-container">
      <div class="header">
        <h1>All the rooms</h1>
        <button @click="myRoom">MY ROOM</button>
      </div>
    </div>
    <room-list :rooms="rooms"></room-list>
  </div>
</template>

<script>
  import Navigation from './Navigation'
  import RoomList from './RoomList'

  export default {
    name: 'hello',
    data () {
      return {
        url_base: 'https://accounts.spotify.com/authorize',
        params: {
          client_id: 'da73848fd0704f87a74b4d5d88dc1642',
          response_type: 'code',
          redirect_uri: 'http://localhost:8080/api/auth/',
          scopes: encodeURIComponent('playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming ugc-image-upload user-follow-modify user-follow-read user-library-read user-library-modify user-read-private user-read-birthdate user-read-email user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played')
        },
        rooms: [
          {
            '_id': '59c291e25201261366322606',
            'owner': {'spotify_id': 'manuel.duran', 'image': null, 'name': null}
          },
          {
            '_id': '59c291e25201261366322606',
            'owner': {'spotify_id': 'tito.molina', 'image': null, 'name': null}
          },
          {
            '_id': '59c291e25201261366322606',
            'owner': {'spotify_id': 'valen.mari', 'image': null, 'name': null}
          },
          {
            '_id': '59c291e25201261366322606',
            'owner': {'spotify_id': 'seba.gallardo', 'image': null, 'name': null}
          },
          {
            '_id': '59c291e25201261366322606',
            'owner': {'spotify_id': 'santi', 'image': null, 'name': null}
          }
        ]
      }
    },
    components: {Navigation, RoomList},
    created () {
      this.$http.get('/api/room').then(response => {
        this.rooms = response.data
        console.log(response.data, this.rooms)
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



  button {
    background-color: #E10045;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 1px;
    font-weight: bold;
    cursor: pointer;
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
