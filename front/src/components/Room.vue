<template>
  <div class="room">
    <navigation :on-search="onKeyUp"></navigation>

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
      <h3>SIGUIENTES</h3>
      <song-list :songs="songs" :is-host="isHost"></song-list>
    </section>

    <player v-if="isHost" :playing="playing"></player>
  </div>
</template>

<script>
  import SongList from './SongList'
  import Player from './Player'
  import Navigation from './Navigation'

  export default {
    name: 'Room',
    components: {SongList, Player, Navigation},
    data () {
      return {
        playing: true,
        songs: [
          {
            title: 'Song n 2',
            artist: 'Roberto',
            album: 'Black Album',
            votes: [{user: 'iqNk8OspZw'}, {user: 'pepe'}, {user: 'carlitos'}]
          },
          {
            title: 'Song n 2',
            artist: 'Roberto',
            album: 'Black Album',
            votes: [{user: 'pepe'}, {user: 'carlitos'}]
          },
          {
            title: 'Song n 2',
            artist: 'Roberto',
            album: 'Black Album',
            votes: [{user: 'carlitos'}]
          }
        ],
        username: this.$route.params.username,
        isHost: false
      }
    },
    methods: {
      toggleNav () {
        console.log('emiting toggleNav')
        this.$emit('toggle-nav', {})
      },
      onKeyUp (query) {
        console.info('it worked')
        if (query.length > 3) {
          // Call the search endpoint
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

  .room {
    @media (max-width: 640px) {
      padding: 0 5%;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      padding: 0 20vw;
    }

    @media (min-width: 1024px) {
      padding: 0 30vw;
    }
  }

  .current-album {
    max-width: 50%;
  }

  .details {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 0 30px 0;
  }



  .info {
    text-align: left;
    padding: 0 25px;
  }
</style>
