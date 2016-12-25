<template>
  <div class="create-view">
    <input type="text" v-model="title">
    <div id="editor">
      <textarea v-model="input"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>

  </div>
</template>

<script>
  /*
   * req.body的格式如下：
   * {
   *    "title": "这是我的第一篇文章",
   *    "author": { "name": "茄果","_id": "57ed2b8cd1e36910b4bd3535"},
   *    "status": "置顶",
   *    "summary": "这是概要",
   *    "text": "这是正文部分。我们常说的网络安全其实应该包括三方面的安全",
   *    "sort": "tech",
   *    "tags": ["XSS", "CSRF", "web安全"],
   * }
   */
  //  import Post from '../components/Post.vue'
  import marked from 'marked';

  export default {

    name: 'create-view',
    //    props: ['item'],

    components: {},

    data () {
      return {
        title: '',
        input: '# Hello Vue.js!'
      }
    },

    computed: {
      compiledMarkdown () {
        return marked(this.input, {sanitize: true})
      }
    },

    methods: {
      postData () {
        this.$http.post('http://192.168.1.106:3000/test')
            .then((response) => {
              console.log('response es6', response.body);
              this.message = JSON.stringify(response.body);
            }, (err) => {
              console.error('err', err);
            });
      }
    }
  }
</script>

<style>
  html, body, #editor {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  textarea, #editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }
</style>