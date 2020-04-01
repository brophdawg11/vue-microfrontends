<template>
    <div class="container">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
}

/* Courtesy of: https://projects.lukehaas.me/css-loaders/ */
.loader,
.loader:before,
.loader:after {
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    animation-fill-mode: both;
    animation: load7 1.8s infinite ease-in-out;
}
.loader {
    color: #656565;
    transform: translateZ(0);
    animation-delay: -0.16s;
}
.loader:before,
.loader:after {
    content: '';
    position: absolute;
    top: 0;
}
.loader:before {
    left: -2rem;
    animation-delay: -0.32s;
}
.loader:after {
    left: 2rem;
}
@-webkit-keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 1rem 0 -0.5rem;
    }
    40% {
        box-shadow: 0 1rem 0 0;
    }
}
@keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 1rem 0 -0.5rem;
    }
    40% {
        box-shadow: 0 1rem 0 0;
    }
}
</style>
