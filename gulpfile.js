var gulp = require('gulp');
var fs = require("fs");
var connect = require('connect');
var del = require('del');
var http = require('http');
var pi = require('gulp-load-plugins')();
var serveStatic = require('serve-static');
var babel = require('gulp-babel');



var paths = {
	app: 'app',
	css: 'app/styles/**/*.css',
	js: 'app/scripts/*.js',
	dist: 'dist'
};

// 这个任务会删除所有构建生成的文件。
// 在定义异步任务时，任务函数应该接受一个回调函数，
// 任务函数在运行完毕后需要调一下这个回调函数，
// 这样 Gulp 才知道这个任务已经结束了。
gulp.task('clean', function(cb) {
	del(paths.dist, cb);
});

gulp.task('babel', () =>
    gulp.src(paths.js)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.dist))
);

// This starts a simple HTTP file server.
// 这个任务会启动一个简单的 HTTP 文件服务器。
gulp.task('connect', function() {
	var app = connect();
	app.use(serveStatic(__dirname));
	http.createServer(app).listen(1919);
});