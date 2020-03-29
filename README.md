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


#### Notes

Inspired in part by https://martinfowler.com/articles/micro-frontends.html
