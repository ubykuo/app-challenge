<script>
  export default {
    name: 'Auth',
    created () {
      alert('TENEMOS EL TOKEN VIEJO!!! ' + this.$route.hash.split(/(=|&)/)[2])
    }
  }
</script>
