<template>
  <section>
    <h1>{{ $route.params.username }}</h1>
    <h3>Songs</h3>
    <song-list :songs="songs"></song-list>
  </section>
</template>

<script>
  import SongList from './SongList'

  export default {
    name: 'Room',
    components: {SongList},
    data () {
      return {
        songs: [
          {
            title: 'Song n 2',
            artist: 'Roberto',
            album: 'Black Album',
            votes: 4
          },
          {
            title: 'Song n 2',
            artist: 'Roberto',
            album: 'Black Album',
            votes: 4
          },
          {
            title: 'Song n 2',
            artist: 'Roberto',
            album: 'Black Album',
            votes: 4
          }
        ]
      }
    }
  }
</script>
