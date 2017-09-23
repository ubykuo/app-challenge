<template>
  <div class='room'>
    <navigation
      :on-search='onKeyUp'
      :songs='results'
      :with-search="true">
    </navigation>
    <div class='content'>
      <h2 class="title">Your Room</h2>

      <section v-if="hasCurrent">
        <div class='details'>
          <img
            :src='currentSong.snippet.thumbnails.medium.url'
            class='current-album'
            alt='Album cover'>
          <div class='info'>
            <h2>{{ currentSong.snippet.title }}</h2>
            <h3>{{ currentSong.snippet.channelTitle }}</h3>
            <p>Votes {{ currentSong.votes.length }}</p>
          </div>
        </div>
        <div v-if="isHost" >
          <div id="player-container">
            <div id="player"></div>
          </div>
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
    <player v-if="isHost" :playing="isPlaying"></player>
  </div>
</template>

<script>
  import SongList from './SongList'
  import Navigation from './Navigation'
  import YouTubeIframeLoader from 'youtube-iframe'
  import Player from './Player'
  import config from '../config'

  export default {
    name: 'Room',
    components: {SongList, Navigation, Player},
    data () {
      return {
        results: [],
        currentSong: {},
        songs: [],
        roomId: this.$route.params.username,
        isPlaying: false,
        player: null
      }
    },
    created: function () {
      this.$socket.emit('access-room', this.roomId)
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
        return Object.keys(this.currentSong).length > 0
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
      },
      loadPlayer (videoId) {
        YouTubeIframeLoader.load((YT) => {
          function onStateChange (event) {
            switch (event.data) {
              case YT.PlayerState.PLAYING:
                this.isPlaying = true
                break
              case YT.PlayerState.ENDED:
                this.$socket.emit('next', this.roomId)
                this.isPlaying = false
                break
              case YT.PlayerState.PAUSED:
                this.isPlaying = false
                break
            }
          }

          this.player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
              autoplay: 1
            },
            events: {
              onStateChange: onStateChange.bind(this)
            }
          })
        })
      }
    },
    socket: {
      events: {
        room (currentRoom) {
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
        current (currentSong) {
          this.currentSong = currentSong

          if (!this.player) {
            this.player = this.loadPlayer(currentSong.id.videoId)
          } else {
            this.player.loadVideoById(currentSong.id.videoId)
          }
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

    @media (max-width: 641px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .info {
        padding-top: 20px;
      }
    }
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

  #player-container {
    position: relative;
    height: 0;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
  }

  .title {
    margin: 25px;

    @media (max-width: 641px) {
      text-align: center;
    }
  }
</style>
