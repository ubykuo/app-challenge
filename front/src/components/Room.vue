<template>
  <div class="room">
    <h2>{{ $route.params.username.toUpperCase() }}</h2>

    <section class="details">
      <img src="https://i.scdn.co/image/8b662d81966a0ec40dc10563807696a8479cd48b"
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
      <song-list :songs="songs"></song-list>
    </section>
  </div>
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

<style lang="scss" scoped>
  h1, h2, h3, h4, p {
    margin: 8px 0;
  }

  .room {
    padding: 0 5%;
  }

  .current-album {
    max-width: 50%;
  }

  .details {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 0 60px 0;
  }

  .info {
    text-align: left;
    padding: 0 25px;
  }
</style>
