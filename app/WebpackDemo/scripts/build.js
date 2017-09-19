'use strict';

//设置环境变量
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const fs = require('fs-extra');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {measureFileSizesBeforeBuild, printFileSizesAfterBuild} = require('react-dev-utils/FileSizeReporter')

const config = require('../config/webpack.prod');
const paths = require('../config/paths');

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

measureFileSizesBeforeBuild(paths.appDist)
    .then(previousFileSizes => {
        fs.emptyDirSync(paths.appDist);

    })