<template>
  <div class="room">
    <navigation :on-search="onKeyUp" :songs="results"></navigation>
    <div class="content">
      <h2>{{ username.toUpperCase() }}</h2>

      <section class="details">
        <img
          src="https://i.scdn.co/image/8b662d81966a0ec40dc10563807696a8479cd48b"
          class="current-album"
          alt="Album cover">
        <div class="info">
          <img src="http://lorempixel.com/75/75/" alt="Votes">
          <h2>Canción</h2>
          <h3>Album</h3>
          <p>Votado por: Pepe, Jorge y 3 más</p>
        </div>
      </section>
      <section class="songs">
        <br>
        <h3>COMING</h3>
        <song-list :songs="songs" :is-host="isHost"></song-list>
      </section>

      <player v-if="isHost" :playing="playing" :room="username"></player>
    </div>
  </div>
</template>

<script>
  import SongList from './SongList'
  import Player from './Player'
  import Navigation from './Navigation'
  import config from '../config'

  export default {
    name: 'Room',
    components: {SongList, Player, Navigation},
    data () {
      return {
        playing: true,
        songs: [],
        results: [],
        username: this.$route.params.username,
        isHost: false
      }
    },
    created: function () {
      if (!this.$localStorage.get('username') && this.isHost) {
        this.$localStorage.set('username', this.username)
      }

      this.$http.get(`http://localhost:8080/api/room/${this.username}`)
      .then((res) => {
        this.songs = res.body.songs
        this.isHost = res.body.isHost
        this.playing = res.body.isPlaying
        console.log(this.isHost, this.playing)
      })
    },
    methods: {
      onKeyUp (query) {
        if (query.length > 3) {
          this.$http.get(`${config.BASE_URL}/api/room/${this.username}/searchSong?q=${query}`).then(
            (res) => {
              this.results = res.data
              console.log('resultado', this.results)
            }
          )
        } else if (query.length === 0) {
          this.results = []
        }
      }
    },
    socket: {
      events: {
        playlist (songs) {
          this.songs = songs
        },
        connect () {
          // Subscribe to the room
          this.$socket.emit('join', this.username)
        },
        removed (id) {
          let index = this.songs.map(song => song.id).indexOf(id)
          if (index !== -1) {
            this.songs.splice(index, 1)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1, h2, h3, h4, p {
    margin: 8px 0;
  }

  .content {
    @media (max-width: 640px) {
      padding: 15px 5%;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      padding: 15px 10vw;
    }

    @media (min-width: 1024px) {
      padding: 15px 30vw;
    }
  }

  .current-album {
    max-width: 50%;
    height: inherit;
  }

  .details {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 0 30px 0;
    height: 30vh;
  }

  .info {
    text-align: left;
    padding: 0 25px;
  }
</style>
