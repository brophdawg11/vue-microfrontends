<template>
  <div :id="slug" class="app">
    <div id="nav">
      <router-link to="/">Home 2</router-link> |
      <router-link to="/about">About 2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slug: process.env.VUE_APP_SLUG,
    };
  }
}
</script>

<style>
.app {
    padding: 20px;
    text-align: center;
}
</style>
