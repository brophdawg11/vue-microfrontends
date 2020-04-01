<template>
    <header class="header">
        <span class="title">Host Header</span>
        <nav class="nav">
            <ul class="list">
                <li class="list-item">
                    <a class="link" href="/app1">App1 Home</a>
                </li>
                <li class="list-item">
                    <a class="link" href="/app1/about">App1 About</a>
                </li>
                <li class="list-item">
                    <a class="link" href="/app2">App2 Home</a>
                </li>
                <li class="list-item">
                    <a class="link" href="/app2/about">App2 About</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

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
