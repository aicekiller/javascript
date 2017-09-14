const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    //todo 如何使用source-map
    devtool: 'source-map',
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        //精简输出，删除味引用代码
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
})