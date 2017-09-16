<template>
  <div>
    <a :href="authLink">Auth</a>
    {{ authLink }}
  </div>
</template>

<script>
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
        url_base: 'https://accounts.spotify.com/authorize',
        params: {
          client_id: 'da73848fd0704f87a74b4d5d88dc1642',
          response_type: 'code',
          redirect_uri: 'http://localhost:8080/api/auth'
        }
      }
    },
    computed: {
      authLink () {
        return `${this.url_base}?client_id=${this.params.client_id}&response_type=${this.params.response_type}&redirect_uri=${this.params.redirect_uri}`
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
