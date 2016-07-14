var connect = require('connect');
var del = require('del');
var gulp = require('gulp');
var http = require('http');
var pi = require('gulp-load-plugins')();
var serveStatic = require('serve-static');

var paths = {
    build: 'build',
    css: 'build/**/*.css',
    html: ['index.html', 'src/**/*.html'],
    js: ['src/**/*.js'],
    jsPlusTests: ['src/**/*.js', 'test/**/*.js'],
    less: 'src/**/*.less',
    test: 'build/**/*-test.js'
};

// This deletes all generated files.
// In tasks that do something asynchronously, the function
// passed to task should take a callback function and
// invoke it when the asynchronous action completes.
// This is how gulp knows when the task has completed.
// 这个任务会删除所有构建生成的文件。
// 在定义异步任务时，任务函数应该接受一个回调函数，
// 任务函数在运行完毕后需要调一下这个回调函数，
// 这样 Gulp 才知道这个任务已经结束了。
gulp.task('clean', function (cb) {
    del(paths.build, cb);
});

// This starts a simple HTTP file server.
// 这个任务会启动一个简单的 HTTP 文件服务器。
gulp.task('connect', function () {
    var app = connect();
    app.use(serveStatic(__dirname));
    http.createServer(app).listen(1919);
});

// This validates all CSS files.
// In this example, the CSS files are generated from LESS files.
// 这个任务会校验所有的 CSS 文件。
// 在这个例子中，CSS 文件都是由 LESS 文件编译生成的。
gulp.task('csslint', function () {
    return gulp.src(paths.css).
        pipe(pi.csslint({ids: false})).
        pipe(pi.csslint.reporter());
});

// This validates JavaScript files using ESLint.
// 这个任务会调用 ESLint 来校验 JavaScript 文件。
gulp.task('eslint', function () {
    return gulp.src(paths.jsPlusTests).
        pipe(pi.changed(paths.build)).
        pipe(pi.eslint({
            envs: ['browser', 'ES6', 'node'],
            rules: {
                curly: [2, 'multi-line'],
                indent: [2, 2]
            }
        })).
        pipe(pi.eslint.format());
});

// This is used by the "watch" task to
// reload the browser when an HTML file is modified.
// 这个任务是用来被 "watch" 任务触发的，
// 从而实现当 HTML 被修改时自动刷新浏览器的效果。
gulp.task('html', function () {
    return gulp.src(paths.html).
        pipe(pi.livereload());
});

// This validates JavaScript files using JSHint.
// 这个任务会调用 JSHint 来校验 JavaScript 文件。
gulp.task('jshint', function () {
    return gulp.src(paths.jsPlusTests).
        pipe(pi.changed(paths.build)).
        pipe(pi.jshint()).
        pipe(pi.jshint.reporter('default'));
});

// This compiles LESS files to CSS files.
// 这个任务会把 LESS 文件编译成 CSS 文件。
gulp.task('less', function () {
    return gulp.src(paths.less).
        pipe(pi.changed(paths.build)).
        pipe(pi.less()).
        pipe(gulp.dest(paths.build)).
        pipe(pi.livereload());
});

// This compiles ES6 JavaScript files to ES5 JavaScript files.
// "transpile" is a term used to describe compiling
// one syntax to a different version of itself.
// Compiling ES6 code to ES5 fits this description.
// 这个任务会把 ES6 的 JavaScript 文件编译成 ES5 的 JavaScript 文件。
// "transpile"（转译）这个术语表示把一种语法编译为这种语法的另一个版本。
// 把 ES6 代码编译成 ES5 正好符合这种情况。
gulp.task('transpile-dev', function () {
    return gulp.src(paths.jsPlusTests).
        pipe(pi.changed(paths.build)).
        pipe(pi.sourcemaps.init()).
        pipe(pi.babel()).
        pipe(pi.sourcemaps.write('.')).
        pipe(gulp.dest(paths.build)).
        pipe(pi.livereload());
});

// This does the same as the previous task, but also
// concatenates and minimizes the resulting JavaScript files.
// 这个任务与上个任务的功能基本一致，
// 但这个任务还会把编译产生的 JavaScript 文件合并、压缩起来。
gulp.task('transpile-prod', function () {
    return gulp.src(paths.js).
        pipe(pi.sourcemaps.init()).
        pipe(pi.babel()).
        pipe(pi.concat('all.js')).
        pipe(pi.uglify()).
        pipe(pi.sourcemaps.write('.')).
        pipe(gulp.dest(paths.build));
});

// This is not meant to be used directly.
// Use the "test" task instead.
// 这个任务并不是用来直接运行的。
// 我们应该使用 "test" 这个任务来代替。
gulp.task('jasmine', function () {
    return gulp.src(paths.test).
        pipe(pi.plumber()).
        pipe(pi.jasmine());
});

gulp.task('test', gulp.series('transpile-dev', 'jasmine'));

// This watches HTML, LESS, and JavaScript files for changes
// and processes them when they do.
// It also reloads the web browser.
// 这个任务会监听 HTML、LESS 和 JavaScript 文件的变动，
// 并在它们有变动的时候处理它们。
// 这个任务也会自动刷新浏览器。
gulp.task('watch', function () {
    pi.livereload.listen();
    gulp.watch(paths.html, gulp.series('html'));
    gulp.watch(paths.less, gulp.series('less', 'csslint'));
    gulp.watch(paths.jsPlusTests,
        gulp.series('eslint', 'jshint', 'transpile-dev'));
});

// This compiles LESS and ES6 JavaScript files in parallel.
// 这个任务会以并行的方式编译 LESS 和 ES6 JavaScript 文件。
gulp.task('build-dev', gulp.parallel('less', 'transpile-dev'));

// This does the same as the previous tasks, but also
// concatenates and minimizes the resulting JavaScript files.
// 这个任务与上个任务的功能基本一致，
// 但这个任务还会把编译产生的 JavaScript 文件合并、压缩起来。
gulp.task('build-prod', gulp.parallel('less', 'transpile-prod'));

// This is used when gulp is run without specifying a task.
// It runs the "build-dev" task and then
// starts the "connect" and "watch" tasks in parallel.
// This is the most commonly used task during development.
// 如果在执行 `gulp` 命令时没有指定任务名，那么这个默认任务就会被调用。
// 它会先运行 "build-dev" 任务，
// 然后以并行的方式启动 "connect" 和 "watch" 任务。
// 这个任务在整个开发期间是最为常用的。
gulp.task('default',
    gulp.series('build-dev', gulp.parallel('connect', 'watch')));