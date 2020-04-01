<template>
    <div id="host">
        <Header />
        <Loader v-show="showLoader" />
        <div v-show="!showLoader" ref="container" class="container">
            <div v-once></div>
        </div>
        <Footer />
    </div>
</template>

<script>
import appManifest from '../app-manifest.json';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Loader from './components/Loader.vue'

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        Loader
    },
    data() {
        return {
            showLoader: true,
        };
    },
    mounted() {
        this.loadSubApp();
    },
    methods: {
        async loadSubApp() {
            const pathSlug = window.location.pathname.split('/')[1];

            let app;
            if (pathSlug) {
                app = appManifest.apps.find(app => app.slug === pathSlug);
            } else {
                app = appManifest.apps[0];
            }

            if (!app) {
                throw new Error(`No subapp found for slug: ${pathSlug}`);
            }

            this.showLoader = true;

            // Clear the container el and assign the proper id for the subapp to mount into
            const el = this.$refs.container.childNodes[0];
            el.innerHTML = '';
            el.id = app.slug;

            // Fetch subapp manifest and grab initial chunks in reverse order which
            // should ensure vendor chunks come before app chunks
            const response = await fetch(`/proxy/${app.slug}/manifest.json`);
            const manifest = await response.json();
            console.log(manifest);
            const initial = Object.values(manifest)
                .filter(f => f.isInitial)
                .map(f => f.path)
                .reverse();

            // Load CSS before JS
            const ordered = [
                ...initial.filter(f => /\.css/.test(f)),
                ...initial.filter(f => /\.js/.test(f)),
            ];

            // Load initial chunks in sequence
            await ordered.reduce(
                (acc, f) => acc.then(() => this.loadAsset(f)),
                Promise.resolve(),
            );

            this.showLoader = false;
        },
        loadAsset(path) {
            return new Promise((resolve, reject) => {
                const id = path.split('/').join('-').replace(/^-/, '').replace(/[^a-z0-9]/ig, '-');
                if (/\.js/.test(path)) {
                    const script = document.createElement('script');
                    script.id = id;
                    script.src = path;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                } else if (/\.css/.test(path)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.id = id;
                    link.href = path;
                    link.onload = resolve;
                    link.onerror = reject;
                    document.head.appendChild(link);
                } else {
                    reject(new Error(`Invalid file type in loadAsset: ${path}`));
                }
            });
        },
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    min-height: 300px;
}
</style>
