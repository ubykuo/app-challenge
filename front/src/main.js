// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueResource)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://accounts.spotify.com/authorize', // Your API domain

  providers: {
    spotify: {
      clientId: 'da73848fd0704f87a74b4d5d88dc1642',
      redirectUri: 'http://localhost:8080/auth' // Your client app URL
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
