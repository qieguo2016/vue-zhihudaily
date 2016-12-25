<template>
  <div class="tech-view">
    <spinner :show="loading"></spinner>
    <post v-for="post in posts" :key="post._id" :post="post"></post>
  </div>
</template>

<script>

  import Spinner from '../components/Spinner.vue'
  import Post from '../components/Post.vue'

  export default {
    name: 'tech-view',
    components: {Spinner, Post},
    data (){
      const isInitialRender = !this.$root._isMounted
      return {
        loading: false,
        posts: isInitialRender ? this.$store.state.posts : []
      }
    },
    beforeMount () {
      this.$store.dispatch('FETCH_ITEMS', {sort: 'tech'})
    },
  }
</script>

<style>

</style>