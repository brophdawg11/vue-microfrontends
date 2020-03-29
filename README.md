# Vue Microfrontend Example

This repo is a demo application of serving independent Vue microfrontend apps within a host app shell.  there are 3 applications in this repo:

* `host/` - The host application is responsible for running the app server, rendering a Vue header/footer application shell, and injecting the proper sub-app JS/CSS files via their manifest
* `app1/` - The first sub-application is a standalone Vue CLI application
* `app2/` - The second sub-application is a standalone Vue CLI application

In a real world use-case, each "app" would be a standalone repository, deployed independently of one another.


## Design Goals

* Apps do not, at the moment, rely on any common/shared framework
  *  So long as each sub-app can mount itself into a element with the proper `id`, in theory we could support subapps using different frameworks
  *  The more-likely use case here is allowing apps to be on different versions of Vue so we do not require mass-upgrades which defeats the purpose of micro-frontends in the first place
* Apps can be worked on and developed independently of the host application
* Apps are independently deployable


## Usage

```bash
git clone <this-repository-url>

# Tab 1
cd host
npm install
npm run serve

# Tab 2
cd app1
npm install
npm run serve

# Tab 3
cd app2
npm install
npm run serve
```

Then access http://localhost:8080 in your browser.  You'll see that by default we load the first sub-app (`app1`) and by clicking in the header we can toggle between our sub-apps.  You can also see that routing within each sub-app works as expected.


## Architecture

All sub-apps are defined in the host `app-manifest.json` file where each app is defined as follows:

```
{
    "name": "App 1",
    "slug": "app1",
    "baseUrl": "http://localhost:8081"
}
```

The `baseUrl` is the server location for the deployed application.   These URLs can be on separate domains because all proxying happens from the host app Express server, so CORS restrictions should not be a problem.  The `slug` is the base path prefix for the subapp (i.e., `/app1/route/to/page`).

The Express server will set up proxies to each subapp as follows, which allows for static assets to come directly from the individual app servers:

```
/proxy/app1 -> https://localhost:8081/proxy/app1
```

To that end, each subapp is expected to configure it's webpack `publicPath` to be `/proxy/{slug}`.  this ensures that initial requests from the host app and async-loaded chunks within webpack use the same URL patterns for static assets.

It renders a header and footer and an empty app "body".  Upon mounting the host application, it look at `window.location` to determine which subapp we're using, defaulting to the first subapp if no slug is present.

One the host app determines the app slug, it loads the manifest for that app through the proxy, via `/procy/{slug}/manifest.json`.  Therefore, each subapp must export a `manifest.json` file in the root `dist/` directory so that the apps static assets can be discoverable upon new deployments.  This is done currently using `webpack-manifest-plugin` by stripping excess `chunk` information and writing out the JS/CSS assets required for initial load:

```
new ManifestPlugin({
    generate(obj, files) {
        return files
            .filter(f => /\.(css|js)$/.test(f.path))
            .map(f => omit(f, ['chunk']));
    },
}),
```

A generated manifest would then look look something like:

```
[
  {
    "path": "/proxy/app1/css/app.490488c8.css",
    "name": "app.css",
    "isInitial": true,
    "isChunk": true,
    "isAsset": false,
    "isModuleAsset": false
  },
  {
    "path": "/proxy/app1/js/app.b9670853.js",
    "name": "app.js",
    "isInitial": true,
    "isChunk": true,
    "isAsset": false,
    "isModuleAsset": false
  },
  {
    "path": "/proxy/app1/js/chunk-vendors.00a2584e.js",
    "name": "chunk-vendors.js",
    "isInitial": true,
    "isChunk": true,
    "isAsset": false,
    "isModuleAsset": false
  }
]
```


After loading the manifest, the host ap can determine which chunks are `isInitial: true` and load them by injecting `<script>` and `<link>` tags into the `<head>`.  These subapps are expected to mount themselves into the empty element prepared by the host app to house the subapp, such as `<div id="app1"></div>`.

Once mounted, the `vue-router` within the subapp takes over - as there is no `vue-router` instance in the host application.  The sub-app must setup `vue-router` with a base path equal to `/{slug}` in order to function correctly.  This is all done in the subapps currently via the `VUE_APP_SLUG` environment variable.

#### Notes

Inspired in part by https://martinfowler.com/articles/micro-frontends.html
