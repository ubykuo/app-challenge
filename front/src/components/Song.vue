<template>
  <div>
    <pre>{{ detail }}</pre>
  </div>
</template>
<script>
  export default {
    name: 'Song',
    props: {
      detail: {
        type: Object,
        required: true
      }
    }
  }
</script>
