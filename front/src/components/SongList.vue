<template>
  <div>
    <ul>
      <li v-for="data in songs">
        <song :detail="data"></song>
      </li>
    </ul>
  </div>
</template>
<script>
  import Song from './Song'

  export default {
    name: 'SongList',
    components: {Song},
    props: {
      songs: {
        type: Array,
        required: true
      }
    },
    created () {
      debugger
    }
  }
</script>
