import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/room/:username',
      name: 'Room',
      component: Room
    }
  ]
})
