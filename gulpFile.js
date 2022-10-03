const { dest, src, parallel, watch, } = require("gulp");
const webpack = require("webpack-stream");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");

const buildFolderName = "build";
const paths = {
  js: {
    from: "./src/**/*.js",
    to: `./${buildFolderName}`,
    fileName: "main.js",
  },
  jsLibrary: {
    from: "./src/Verificateur.js",
    to: "../verificateur_BUILD/build",
    fileName: "Verificateur.js",
  },
};

const jsLibrary = () => {
  return src(paths.jsLibrary.from)
    .pipe(plumber())
    .pipe(webpack({
      mode: "production",
      output: {
        filename: paths.jsLibrary.fileName,
        library: "vr",
        libraryTarget: "umd",
      },
    }))
    .pipe(uglify())
    .pipe(dest(paths.jsLibrary.to));
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
  watch(paths.js.from, parallel(js));
};

exports.build = parallel(js, jsLibrary);
exports.default = parallel(js, watching);
exports.buildLibrary = parallel(jsLibrary);