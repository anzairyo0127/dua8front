const gulp = require("gulp");
const pug = require("gulp-pug");
const notify = require("gulp-notify");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

const paths = {
  root: './dist/',
  pug: ['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'],
  html: './dist/html/',
  scssSrc: './src/scss/**/*.scss',
  cssDist: './dist/css/',
  jsDist: './dist/scripts/'
};

gulp.task("scss", () => {
  return (gulp.src(paths.scssSrc)
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })))
  .pipe(sass({ outputStyle: "compressed"}))
  .pipe(autoprefixer({
    cascade: false,
    grid: true
  }))
  .pipe(gulp.dest(paths.cssDist))
});

gulp.task("pug", () => {
  return (gulp.src(paths.pug)
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })))
  .pipe(pug({
    pretty: true,
    basedir: "./src/pug"
  }))
  .pipe(gulp.dest(paths.html))
});

gulp.task("webpack", () => {
  return webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest(paths.jsDist));
});
