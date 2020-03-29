const { createProxyMiddleware } = require('http-proxy-middleware');

const appManifest = require('./app-manifest.json');

module.exports = {
    lintOnSave: false,
    devServer: {
        before(server) {
            // Proxy all /proxy/{slug}/* requests to the sub-app servers
            appManifest.apps.forEach(({ slug, baseUrl }) => {
                server.use(`/proxy/${slug}`, createProxyMiddleware({ target: baseUrl }));
            });
        }
    }
}
