<template>
  <header class="header">
    <span class="title">Header</span>
    <ul class="list">
      <li v-for="app in apps" :key="app.slug" class="list-item">
        <a class="link" :href="`/${app.slug}`">{{app.name}}</a>
      </li>
    </ul>
  </header>
</template>

<script>
import appManifest from '../../app-manifest.json';

export default {
  name: 'Header',
  data() {
    return {
      apps: appManifest.apps,
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    background-color: lightgrey;
    padding: 20px;
    text-align: center;
}

.title {
    margin-right: 1rem;
}

.list {
    display: inline;
    list-style-type: none;
}

.list-item {
    display: inline;
}

.list-item:not(:last-child)::after {
    content: ' | ';
}
</style>
