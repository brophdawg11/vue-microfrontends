<template>
    <header class="header">
        <span class="title">Host Header</span>
        <nav class="nav">
            <ul class="list">
                <li class="list-item">
                    <a class="link" href="/app1" @click="onLinkClick">App1 Home</a>
                </li>
                <li class="list-item">
                    <a class="link" href="/app1/about" @click="onLinkClick">App1 About</a>
                </li>
                <li class="list-item">
                    <a class="link" href="/app2" @click="onLinkClick">App2 Home</a>
                </li>
                <li class="list-item">
                    <a class="link" href="/app2/about" @click="onLinkClick">App2 About</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    methods: {
        onLinkClick(e) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            window.history.pushState({ href }, '', href);
            this.$emit('route-change', href);
        },
    },
};
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

.nav {
    display: inline;
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
