<template>
  <div class="song">
    <img src="https://i.scdn.co/image/54b3222c8aaa77890d1ac37b3aaaa1fc9ba630ae"
         class="album-cover"
         alt="Album cover">

    <div class="detail">
      <h3>{{ detail.title }}</h3>
      <h4>{{ detail.album }}</h4>
    </div>

    <div class="actions" v-if="isPlaylist">
      <span class="votes">{{ totalVotes }}</span>

      <div v-if="isHost" class="action" @click="onRemove(detail.id)">
        <i class="fa fa-2x fa-trash"></i>
      </div>

      <div v-else-if="!hasVoted" class="action"
           @click="onVote(detail.id)">
        <i class="fa fa-2x fa-thumbs-up"></i>
      </div>

      <div v-else class="action">
        <i class="fa fa-2x fa-check"></i>
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
      },
      isPlaylist: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      totalVotes () {
        return this.detail.votes.length
      },
      hasVoted () {
        const id = this.$localStorage.get('id')
        return (this.detail.votes.find(vote => {
          return vote.user === id
        }) !== undefined)
      }
    },
    methods: {
      onRemove (id) {
        this.$socket.emit('remove', id)
      },
      onVote (id) {
        this.$emit('vote', {
          user: this.$localStorage.get('id'),
          id
        })
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
    width: 100%;
  }

  .album-cover {
    height: fit-content;
    padding-left: 10px;
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
