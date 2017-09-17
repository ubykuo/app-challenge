<template>
  <header>
    <router-link class="main-title" to="/">Music Room</router-link>
    <i class="fa fa-search fa-2x search"></i>
  </header>
</template>

<script>
  export default {
    name: 'Navigation'
  }
</script>

<style lang="scss" scoped>
  @import '~@/variables.scss';
  @import url('https://fonts.googleapis.com/css?family=Lobster');

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  router-link {
    text-decoration: none !important;
  }

  .search {
    color: $secondary;
  }

  .main-title {
    font-family: 'Lobster', sans-serif;
    color: $secondary;
    font-size: 2em;
  }
</style>
