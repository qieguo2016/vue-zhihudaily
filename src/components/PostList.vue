<template>
  <div class="posts-view">
    <spinner :show="loading"></spinner>
    <post v-for="post in displayedItems" :key="post.id" :post="post"></post>
  </div>
</template>

<script>
  import Spinner from './Spinner.vue'
  import Post from './Post.vue'

  export default {
    name: 'posts-view',

    components: {
      Spinner,
      Post
    },

    props: {
      type: String
    },

    data () {
      const isInitialRender = !this.$root._isMounted
      return {
        loading: false,
        transition: 'slide-left',
        // if this is the initial render, directly render with the store state
        // otherwise this is a page switch, start with blank and wait for data load.
        // we need these local state so that we can precisely control the timing
        // of the transitions.
        // displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
         displayedItems: isInitialRender ? this.$store.state.posts : []
      }
    },

    computed: {
      displayedItems () {
        console.log('this.$store.state', this.$store.state);
        return this.$store.state.posts;
      },
//      page () {
//        return Number(this.$store.state.route.params.page) || 1
//      },
//      maxPage () {
//        const {itemsPerPage, lists} = this.$store.state
//        return Math.ceil(lists[this.type].length / itemsPerPage)
//      },
//      hasMore () {
//        return this.page < this.maxPage
//      }
    },

    beforeMount () {
      if (this.$root._isMounted) {
        this.loadItems(this.page)
      }
        this.$store.commit('SET_LIST', {sort: this.sort, ids})
        this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
          this.displayedItems = this.$store.getters.activeItems
        })

    },

    beforeDestroy () {
      this.unwatchList()
    },

    watch: {
      page (to, from) {
        this.loadItems(to, from)
      }
    },

    methods: {
      loadItems (to = this.page, from = -1) {
        this.loading = true
        this.$store.dispatch('FETCH_LIST_DATA', {
          type: this.type
        }).then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/${this.type}/1`)
            return
          }
          this.transition = to > from ? 'slide-left' : 'slide-right'
          this.displayedPage = to
          this.loading = false
        })
      }
    }
  }
</script>

<style>

</style>
