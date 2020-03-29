const ManifestPlugin = require('webpack-manifest-plugin');

// Omit fields from a given object
const omit = (obj, fields = []) => Object.entries(obj).reduce(
    (acc, [k, v]) => (fields.includes(k) ? acc : Object.assign(acc, { [k]: v })),
    {},
);

module.exports = {
    lintOnSave: false,
    publicPath: `/proxy/${process.env.VUE_APP_SLUG}`,
    configureWebpack: {
        plugins: [
            new ManifestPlugin({
                generate(obj, files) {
                    return files
                        .filter(f => /\.(css|js)$/.test(f.path))
                        .map(f => omit(f, ['chunk']));
                },
            }),
        ],
    },
    devServer: {
        port: 8081,
    },
};
