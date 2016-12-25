<template>
  <article class="post">
    <header class="post-header">
      <h1 class="post-title">
        <router-link :to="'/post/' + post._id">{{post.title}}</router-link>
      </h1>
      <div class="post-meta">
        <a class="post-type" :href="'/'+post.sort" target="_blank">{{post.sort}}</a>
        <span class="post-date">{{post.created_at}}</span>
      </div>
    </header>
    <div class="post-summary">
      <p v-html="compiledMarkdown"></p>
      <p>
        <router-link :to="'/post/' + post._id">继续阅读 »</router-link>
      </p>
    </div>
    <footer class="post-footer">
      <span>阅读({{post.read_num}})</span>
      <span>评论({{post.comments.length}})</span>
    </footer>
  </article>
</template>

<script>

  import marked from 'marked';

  export default {
    name: 'post',
    props: ['post'],
    computed: {
      compiledMarkdown () {
        console.log('this.post', this.post);
        return marked(this.post.summary, {sanitize: true})
      }
    },
    //    serverCacheKey: props => {
    //      return `${props.post.id}::${props.post.__lastUpdated}`
    //    }
  }
</script>

<style>
  .post {

  }

  .post-header {

  }

  .post-title {

  }

  .post-meta {

  }

  .post-type {

  }

  .post-date {

  }

  .post-summary {

  }

  .post-footer {

  }
</style>