<template>
  <a :href="OAuthLink">Login</a>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'hello',
    methods: {
      onClick() {
        axios.get('https://accounts.spotify.com/authorize', {
          params: {
            client_id: 'da73848fd0704f87a74b4d5d88dc1642',
            response_type: 'code',
            redirect_uri: '/',
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }).then(() => {
          debugger;
        });
      },
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js PWA',
        OAuthLink:
          'https://accounts.spotify.com/authorize?client_id=da73848fd0704f87a74b4d5d88dc1642&response_type=code&redirect_uri=http://app-challenge.herokuapp.com/auth',
      };
    },
  };
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
