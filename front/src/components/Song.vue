<template>
  <div class="song">
    <img src="https://i.scdn.co/image/54b3222c8aaa77890d1ac37b3aaaa1fc9ba630ae"
         class="album-cover"
         alt="Album cover">

    <div class="detail">
      <h3>{{ detail.title }}</h3>
      <h4>{{ detail.album }}</h4>
    </div>

    <div class="actions">
      <span class="votes">{{ detail.votes }}</span>

      <div v-if="isHost" class="action" @click="onRemove(detail.id)">
        <i class="fa fa-2x fa-trash"></i>
      </div>

      <div v-if="!isHost" class="action" @click="onLink(detail.id)">
        <i class="fa fa-2x fa-thumbs-up"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Song',
    props: {
      detail: {
        type: Object,
        required: true
      },
      isHost: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      onRemove (id) {
        this.$socket.emit('remove', id)
      },
      onLike (id) {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/variables.scss';

  h1, h2, h3, h4, p {
    margin: 8px 0;
  }

  .song {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: $terciary;
    padding: 5px 10px;
    width: 100%;
  }

  .album-cover {
    height: fit-content;
  }

  .detail {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 20px;
    width: 100%;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .votes {
    font-weight: bold;
  }

  .action {
    padding: 20px;
    cursor: pointer;
  }
</style>
