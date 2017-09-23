<template>
  <div class="container">
    <div class="progress" :style="style"></div>
  </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    computed: {
      style () {
        return {
          'width': this.progress + '%'
        }
      }
    },
    props: {
      progress: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    background: #06032c;
    height: 3px;
  }

  .progress {
    background: #E10045;
    top: 0;
    height: 3px;
  }
</style>
