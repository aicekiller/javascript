'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

//返回项目根目录(/Users/weizhiqiang/my project/javascript/app/WebpackDemo)
const appDirectory = fs.realpathSync(process.cwd());

//组合路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appDist:resolveApp('dist'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules')
}
