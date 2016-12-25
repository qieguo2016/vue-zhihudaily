<template>
  <div id="app">
    <header class="nav-menu">
      <router-link to="/" exact>
        <img class="logo" src="./assets/logo.png" alt="logo">
      </router-link>
      <router-link to="/tech">技术</router-link>
      <router-link to="/life">生活</router-link>
      <router-link to="/project">项目</router-link>
      <router-link to="/about">me</router-link>
      <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank">
        登录
      </a>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style>

  body {
    font-family: Roboto, Helvetica, sans-serif;
    margin: 0;
    padding-top: 40px;
  }

  .nav-menu {
    background-color: #0593d3;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
  }

  .nav-menu a {
    color: rgba(224, 212, 212, .8);
    line-height: 40px;
    transition: color .15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    margin-right: .5em;
    text-decoration: none;
    height: 40px;
  }

  .nav-menu a:hover {
    color: #fff;
  }

  .nav-menu .router-link-active {
    color: #fff;
    font-weight: 400;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .view {
    padding: 0 10px;
  }
</style>
