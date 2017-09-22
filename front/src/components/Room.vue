<template>
  <div class='room'>
    <navigation :on-search='onKeyUp' :songs='results'></navigation>
    <div class='content'>
      <h2>{{ roomId.toUpperCase() }}</h2>

      <section class='details'>
        <img
          :src='current.snippet.thumbnails.url'
          class='current-album'
          alt='Album cover'>
        <div class='info'>
          <img src='http://lorempixel.com/75/75/' alt='Votes'>
          <h2>Canción</h2>
          <h3>Album</h3>
          <p>Votado por: Pepe, Jorge y 3 más</p>
        </div>
      </section>
      <section class='songs'>
        <br>
        <h3>COMING</h3>
        <song-list :songs='songs' :is-host='isHost'></song-list>
      </section>

      <player v-if='isHost' :playing='playing' :room='roomId'></player>
    </div>
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
        songs: [],
        current: {
          'kind': 'youtube#searchResult',
          'etag': 'adsadsdawdwad',
          'id': {
            'kind': 'video',
            'videoId': 'asdasdad',
            'channelId': 'Nota Lokos',
            'playlistId': '123123131'
          },
          'snippet': {
            'publishedAt': new Date(),
            'channelId': 'Nota Lokos',
            'title': 'La Más Linda del Salón',
            'description': 'Un tema re rancio sobre una mina que aprueba las materias y no sale',
            'thumbnails': {
              'AIzaSyB_bzFNBzczyua7-c1DyNefI81waHu7j7k': {
                'url': 'https://i.scdn.co/image/8b662d81966a0ec40dc10563807696a8479cd48b',
                'width': 200,
                'height': 200
              }
            },
            channelTitle: 'Nota Lokos VEVO'
          }
        },
        results: [],
        roomId: this.$route.params.username,
        isHost: false
      }
    },
    methods: {
      onKeyUp (q) {
        if (q.length > 3) {
          this.$http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              q,
              part: 'snippet, id',
              type: 'video',
              key: 'AIzaSyB_bzFNBzczyua7-c1DyNefI81waHu7j7k'
            }
          }).then((res) => {
            this.results = res.data
          })
        } else if (q.length === 0) {
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
          this.$socket.emit('join', this.roomId)
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

<style lang='scss' scoped>
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
