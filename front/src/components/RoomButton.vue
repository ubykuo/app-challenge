<template>
  <button @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'RoomButton',
    props: {
      onClick: {
        type: Function,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  button {
    background-color: #E10045;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 1px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
