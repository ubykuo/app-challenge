<template>
  <div class='room'>
    <navigation :on-search='onKeyUp' :songs='results'></navigation>
    <div class='content'>
      <h2>{{ roomId.toUpperCase() }}</h2>

      <section v-if="hasCurrent">
        <div v-if="!isHost" class='details'>
          <img
            :src='current.snippet.thumbnails["AIzaSyB_bzFNBzczyua7-c1DyNefI81waHu7j7k"].url'
            class='current-album'
            alt='Album cover'>
          <div class='info'>
            <h2>{{ current.snippet.title }}</h2>
            <h3>{{ current.snippet.channelTitle }}</h3>
            <p>Votado por: Pepe, Jorge y 3 más</p>
          </div>
        </div>
        <div v-else>
          <h3 class="now-playing">Now playing</h3>
          <div id="player"></div>
        </div>
      </section>
      <section v-else class="no-current">
        <h3>No song playing currently</h3>
      </section>
      <section class='songs'>
        <h3>COMING</h3>
        <song-list :songs='songs' :is-host='isHost'></song-list>
      </section>
    </div>
  </div>
</template>

<script>
  import SongList from './SongList'
  import Navigation from './Navigation'
  import YouTubeIframeLoader from 'youtube-iframe'
  import config from '../config'

  export default {
    name: 'Room',
    components: {SongList, Navigation},
    data () {
      return {
        results: [],
        current: {},
        songs: [],
        roomId: this.$route.params.username
      }
    },
    created: function () {
      this.$socket.emit('access-room', this.roomId)

      if (this.isHost) {
        YouTubeIframeLoader.load((YT) => {
          const dimensions = getPlayerDimensions()
          console.info(dimensions)

          new YT.Player('player', {
            height: dimensions.h,
            width: dimensions.w,
            videoId: 'M7lc1UVf-VE',
            events: {
              onReady: onPlayerReady,
              onStateChange: onStateChange.bind(this)
            }
          })

          function onPlayerReady (event) {
            console.info(event)
          }

          function onStateChange (event) {
            if (event.data === YT.PlayerState.ENDED) {
              this.$socket.emit('next')
            }
          }

          function getPlayerDimensions () {
            const mq = window.matchMedia('min-width: 641px')
            let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

            return {
              w: (mq.matches ? w / 1.5 : w) - 60,
              h: w / 1.64
            }
          }
        })
      }
    },
    destroyed: function () {
      if (this.isHost) {
        this.$socket.emit('destroy', this.roomId)
      }
    },
    computed: {
      isHost () {
        return this.roomId === this.$localStorage.get('id')
      },
      hasCurrent () {
        return Object.keys(this.current).length > 0
      }
    },
    methods: {
      onKeyUp (q) {
        if (q.length > 3) {
          this.$http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              q: `musica ${q}`,
              part: 'snippet, id',
              type: 'video',
              key: config.CLIENT_ID
            },
            before (request) {
              if (this.previousRequest) {
                this.previousRequest.abort()
              }

              this.previousRequest = request
            }
          }).then((res) => {
            console.log(res.data.items)
            this.results = res.data.items
          })
        } else if (q.length === 0) {
          this.results = []
        }
      }
    },
    socket: {
      events: {
        room (currentRoom) {
          this.current = currentRoom.current || {}
          this.songs = currentRoom.songs.sort((a, b) => {
            if (a.votes.length < b.votes.length) {
              return 1
            }

            if (a.votes.length > b.votes.length) {
              return -1
            }

            return 0
          })
        },
        destroyed () {
          if (!this.isHost) {
            this.$router.push('/')
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

    @media (min-width: 641px) {
      padding: 15px 10vw;
    }
  }

  .current-album {
    max-width: 50%;
    height: inherit;
  }

  .with-iframe {
    height: 420px !important;
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

  .no-current {
    padding: 30px;
  }

  .now-playing {
    text-align: left;
  }
</style>
