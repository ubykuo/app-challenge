<template>
  <div class='room'>
    <navigation
      :on-search='onKeyUp'
      :songs='results'
      :with-search="true">
    </navigation>
    <div class='content'>
      <h2 class="title">Playing at {{ roomId }}'s Room </h2>

      <section v-if="hasCurrent" class="info-container">
        <div class='details'>
          <img
            :src='currentSong.snippet.thumbnails.medium.url'
            class='current-album'
            alt='Album cover'>
          <div class='info'>
            <h2>{{ currentSong.snippet.title }}</h2>
            <h3>{{ currentSong.snippet.channelTitle }}</h3>
            <p>{{ detailedVotes }}</p>
            <p>Duration: {{ getSongLength }}</p>
          </div>
        </div>
        <div v-if="isHost">
          <div id="player-container">
            <div id="player"></div>
          </div>
        </div>
      </section>
      <section v-else class="no-current">
        <h3>No song playing currently</h3>
      </section>
      <section class='songs'>
        <h3>Coming up next</h3>
        <song-list :songs='songs' :is-host='isHost'></song-list>
      </section>

    </div>
    <player v-if="isHost" :playing="isPlaying" :progress="progress"
            :total="playerTotalTime" :on-toggle="onToggle"
            :current="playerCurrentTime"></player>
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
        player: null,
        progress: 0,
        playerTotalTime: 0,
        playerCurrentTime: 0
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
      },
      detailedVotes () {
        if (this.currentSong.votes.length === 1) {
          return `Added by ${this.currentSong.votes[0]}`
        } else if (this.currentSong.votes.length === 2) {
          return `${this.currentSong.votes[0]} and ${this.currentSong.votes[1]}`
        } else {
          return `${this.currentSong.votes[0]}, ${this.currentSong.votes[1]} and ${this.currentSong.votes.length - 2} more`
        }
      },
      getSongLength () {
        return (this.playerTotalTime / 60).toFixed(2)
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
            this.results = res.data.items
          })
        } else if (q.length === 0) {
          this.results = []
        }
      },
      onToggle () {
        this.isPlaying = !this.isPlaying
        if (this.isPlaying) {
          if (this.hasCurrent) {
            this.player.playVideo()
          } else {
            this.$socket.emit('next', this.roomId)
          }
        } else {
          this.player.pauseVideo()
        }
      },
      loadPlayer (videoId) {
        YouTubeIframeLoader.load((YT) => {
          let mytimer

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

          function onStateChange (event) {
            switch (event.data) {
              case YT.PlayerState.PLAYING:
                this.isPlaying = true
                this.playerTotalTime = this.player.getDuration()
                mytimer = setInterval(() => {
                  this.playerCurrentTime = this.player.getCurrentTime()
                  this.progress = (this.playerCurrentTime / this.playerTotalTime) * 100
                }, 1000)
                break
              case YT.PlayerState.ENDED:
                this.$socket.emit('next', this.roomId)
                this.isPlaying = false
                clearTimeout(mytimer)
                break
              case YT.PlayerState.PAUSED:
                this.isPlaying = false
                clearTimeout(mytimer)
                break
            }
          }
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
  @import '~@/variables.scss';

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
      height: 40vh;

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

  .info-container {
    border-bottom: 2px solid $secondary;
    margin-bottom: 25px;
  }
</style>
