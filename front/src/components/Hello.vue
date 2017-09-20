<template>
  <div>
    <a :href="authLink">Auth</a>
    {{ authLink }}
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js PWA',
        url_base: 'https://accounts.spotify.com/authorize',
        params: {
          client_id: 'da73848fd0704f87a74b4d5d88dc1642',
          response_type: 'code',
          redirect_uri: 'http://localhost:8080/api/auth/',
          scopes: encodeURIComponent('playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming ugc-image-upload user-follow-modify user-follow-read user-library-read user-library-modify user-read-private user-read-birthdate user-read-email user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played')
        }
      }
    },
    computed: {
      authLink () {
        return `${this.url_base}?client_id=${this.params.client_id}&response_type=${this.params.response_type}&redirect_uri=${this.params.redirect_uri}&scopes=${this.params.scopes}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
