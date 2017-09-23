<template>
  <div class='room'>
    <navigation :on-search='onKeyUp' :songs='results'></navigation>
    <div class='content'>
      <h2>{{ roomId.toUpperCase() }}</h2>

      <section :style="{}">
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
      <section class='songs'>
        <br>
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
        songs: [
          {
            'kind': 'youtube#searchResult',
            'etag': '\'VPWTmrH7dFmi4s1RqrK4tLejnRI/vy4Nryjwra9XhlGmtwxHKxV4s18\'',
            'id': {
              'kind': 'youtube#video',
              'videoId': 'qkgbbFHQ7Yo'
            },
            'snippet': {
              'publishedAt': '2017-09-19T18:00:08.000Z',
              'channelId': 'UC5H_KXkPbEsGs0tFt8R35mA',
              'title': 'The Martin Garrix Show: S2.E5 Rehearsals',
              'description': 'Follow Martin Garrix: Facebook: http://facebook.com/MartinGarrix Twitter: http://twitter.com/MartinGarrix Instagram: http://instagram.com/MartinGarrix YouTube: ...',
              'thumbnails': {
                'default': {
                  'url': 'https://i.ytimg.com/vi/qkgbbFHQ7Yo/default.jpg',
                  'width': 120,
                  'height': 90
                },
                'medium': {
                  'url': 'https://i.ytimg.com/vi/qkgbbFHQ7Yo/mqdefault.jpg',
                  'width': 320,
                  'height': 180
                },
                'high': {
                  'url': 'https://i.ytimg.com/vi/qkgbbFHQ7Yo/hqdefault.jpg',
                  'width': 480,
                  'height': 360
                }
              },
              'channelTitle': 'Martin Garrix',
              'liveBroadcastContent': 'none'
            }
          },
          {
            'kind': 'youtube#searchResult',
            'etag': '\'VPWTmrH7dFmi4s1RqrK4tLejnRI/hGOMi2BGqxpzdAeOIFxE0LRbRBU\'',
            'id': {
              'kind': 'youtube#video',
              'videoId': 'pNNMr5glICM'
            },
            'snippet': {
              'publishedAt': '2017-05-26T04:00:18.000Z',
              'channelId': 'UC5H_KXkPbEsGs0tFt8R35mA',
              'title': 'Martin Garrix & Troye Sivan - There For You (Official Video)',
              'description': 'My new single with Troye Sivan out now! Spotify: http://stmpd.co/TFYs iTunes: http://stmpd.co/TFYi Follow Martin Garrix: Facebook: ...',
              'thumbnails': {
                'default': {
                  'url': 'https://i.ytimg.com/vi/pNNMr5glICM/default.jpg',
                  'width': 120,
                  'height': 90
                },
                'medium': {
                  'url': 'https://i.ytimg.com/vi/pNNMr5glICM/mqdefault.jpg',
                  'width': 320,
                  'height': 180
                },
                'high': {
                  'url': 'https://i.ytimg.com/vi/pNNMr5glICM/hqdefault.jpg',
                  'width': 480,
                  'height': 360
                }
              },
              'channelTitle': 'Martin Garrix',
              'liveBroadcastContent': 'none'
            }
          },
          {
            'kind': 'youtube#searchResult',
            'etag': '\'VPWTmrH7dFmi4s1RqrK4tLejnRI/ZHfRSSLZsS4KVCbww6csC_F3Tcc\'',
            'id': {
              'kind': 'youtube#video',
              'videoId': 'g_s17HMFaug'
            },
            'snippet': {
              'publishedAt': '2017-07-31T19:21:31.000Z',
              'channelId': 'UC5H_KXkPbEsGs0tFt8R35mA',
              'title': 'Martin Garrix - Live @ Tomorrowland 2017',
              'description': 'My new single with Troye Sivan out now! Spotify: http://stmpd.co/TFYs Martin Garrix closing the mainstage of Tomorrowland Sunday the 30th of ...',
              'thumbnails': {
                'default': {
                  'url': 'https://i.ytimg.com/vi/g_s17HMFaug/default.jpg',
                  'width': 120,
                  'height': 90
                },
                'medium': {
                  'url': 'https://i.ytimg.com/vi/g_s17HMFaug/mqdefault.jpg',
                  'width': 320,
                  'height': 180
                },
                'high': {
                  'url': 'https://i.ytimg.com/vi/g_s17HMFaug/hqdefault.jpg',
                  'width': 480,
                  'height': 360
                }
              },
              'channelTitle': 'Martin Garrix',
              'liveBroadcastContent': 'none'
            }
          },
          {
            'kind': 'youtube#searchResult',
            'etag': '\'VPWTmrH7dFmi4s1RqrK4tLejnRI/pkx2qjDBSKM92sRQhj8JWr3YOqQ\'',
            'id': {
              'kind': 'youtube#video',
              'videoId': 'e2vBLd5Egnk'
            },
            'snippet': {
              'publishedAt': '2017-01-27T05:00:01.000Z',
              'channelId': 'UC5H_KXkPbEsGs0tFt8R35mA',
              'title': 'Martin Garrix & Dua Lipa - Scared To Be Lonely (Official Video)',
              'description': 'My new single Scared To ...',
              'thumbnails': {
                'default': {
                  'url': 'https://i.ytimg.com/vi/e2vBLd5Egnk/default.jpg',
                  'width': 120,
                  'height': 90
                },
                'medium': {
                  'url': 'https://i.ytimg.com/vi/e2vBLd5Egnk/mqdefault.jpg',
                  'width': 320,
                  'height': 180
                },
                'high': {
                  'url': 'https://i.ytimg.com/vi/e2vBLd5Egnk/hqdefault.jpg',
                  'width': 480,
                  'height': 360
                }
              },
              'channelTitle': 'Martin Garrix',
              'liveBroadcastContent': 'none'
            }
          },
          {
            'kind': 'youtube#searchResult',
            'etag': '\'VPWTmrH7dFmi4s1RqrK4tLejnRI/gTQEtSEReizraFWcG0gyNim7ZU8\'',
            'id': {
              'kind': 'youtube#video',
              'videoId': 'JsKIAO11q1Y'
            },
            'snippet': {
              'publishedAt': '2017-08-25T04:00:02.000Z',
              'channelId': 'UC5H_KXkPbEsGs0tFt8R35mA',
              'title': 'Martin Garrix - Pizza (Official Video)',
              'description': 'My new song  is out now! Spotify: http://stmpd.co/MGPIZZAs iTunes: http://stmpd.co/MGPIZZAi Apple Music: http://stmpd.co/MGPIZZAa Follow Martin ...',
              'thumbnails': {
                'default': {
                  'url': 'https://i.ytimg.com/vi/JsKIAO11q1Y/default.jpg',
                  'width': 120,
                  'height': 90
                },
                'medium': {
                  'url': 'https://i.ytimg.com/vi/JsKIAO11q1Y/mqdefault.jpg',
                  'width': 320,
                  'height': 180
                },
                'high': {
                  'url': 'https://i.ytimg.com/vi/JsKIAO11q1Y/hqdefault.jpg',
                  'width': 480,
                  'height': 360
                }
              },
              'channelTitle': 'Martin Garrix',
              'liveBroadcastContent': 'none'
            }
          }
        ],
        roomId: this.$route.params.username
      }
    },
    created: function () {
      this.$socket.emit('access-room', {id: this.roomId})

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
        this.$socket.emit('destroy', {id: this.roomId})
      }
    },
    computed: {
      isHost () {
        return this.roomId === this.$localStorage.get('id')
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
              key: config.CLIENT_ID
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
        room (room) {
          this.current = room.current
          this.songs = room.songs
          this.isHost = (this.roomId === room.room_id)
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

  .now-playing {
    text-align: left;
  }
</style>
