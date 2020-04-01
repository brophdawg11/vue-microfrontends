<template>
    <div :id="slug" class="app">
        <div id="nav">
            <span class="title">App1 Header</span>
            <router-link to="/">App1 Home</router-link> |
            <router-link to="/about">App1 About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slug: process.env.VUE_APP_SLUG
        };
    }
}
</script>

<style scoped>
.app {
    padding: 20px;
    text-align: center;
}

.title {
    margin-right: 1rem;
}
</style>
