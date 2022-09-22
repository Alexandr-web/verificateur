const { dest, src, parallel, watch, } = require("gulp");
const webpack = require("webpack-stream");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");

const buildFolderName = "build";
const paths = {
  js: {
    from: "./src/index.js",
    watchSrc: "./src/**/*.js",
    to: `./${buildFolderName}`,
    fileName: "main.js",
  },
  jsBuild: {
    from: "./src/Verificateur.js",
    to: `./${buildFolderName}`,
    fileName: "Verificateur.js",
  },
};

const jsBuild = () => {
  return src(paths.jsBuild.from)
    .pipe(plumber())
    .pipe(webpack({
      mode: "production",
      output: {
        filename: paths.jsBuild.fileName,
        library: "vr",
        libraryTarget: "umd",
      },
    }))
    .pipe(uglify())
    .pipe(dest(paths.jsBuild.to));
};

const js = () => {
  return src(paths.js.from)
    .pipe(plumber())
    .pipe(webpack({ mode: "development", }))
    .pipe(uglify())
    .pipe(concat(paths.js.fileName))
    .pipe(dest(paths.js.to));
};

const watching = () => {
  watch(paths.js.watchSrc || paths.js.from, parallel(js));
  watch(paths.jsBuild.watchSrc || paths.js.from, parallel(jsBuild));
};

exports.build = parallel(js);
exports.default = parallel(js, watching);
exports.buildLibrary = parallel(jsBuild);