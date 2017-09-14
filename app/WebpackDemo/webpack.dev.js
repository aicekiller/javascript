const merge = require('webpack-merge');
const common = require('./webpack.common');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: './dist'
    // },
    plugins: [
        //生成dist/manifest.json
        new ManifestPlugin()
    ]
})