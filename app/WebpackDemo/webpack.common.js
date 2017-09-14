const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());

console.log(envPublicUrl);

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js',
        vendor: [
            'lodash'
        ]
    },

    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //for server.js
        //publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        //清除dist
        new CleanWebpackPlugin(['dist']),
        //生成新的模板文件dist/index.html
        new HtmlWebpackPlugin({
            title: 'cache'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ]
};