const path = require('path')
const { src, dest, series, watch } = require('gulp')
const gulpSass = require('gulp-sass')
const gulpAutoprefixer = require('gulp-autoprefixer')
const gulpSourcemaps = require('gulp-sourcemaps')
const del = require('del')

gulpSass.compiler = require('node-sass')

// -------------------------------------------------------------------------------
// Utilities

function normalize(p) {
  return p.replace(/\\/g, '/')
}

function root(...p) {
  const paths = p.map(_p =>
    _p.startsWith('!') ?
      normalize(`!${path.join(__dirname, _p.slice(1))}`) :
      normalize(path.join(__dirname, _p)))
  return paths.length === 1 ? paths[0] : paths
}

// -------------------------------------------------------------------------------
// Sass task factory

const buildCss = function ({ sourcemaps, minify }) {
  let pipeline = src(root('src/vendor/styles/**/*.scss', '!src/vendor/styles/**/_*.scss', '!src/vendor/styles/pages/**/*.scss'), {
    base: root('src/vendor/styles')
  })

  if (sourcemaps) {
    pipeline = pipeline.pipe(gulpSourcemaps.init())
  }

  pipeline = pipeline.pipe(gulpSass({
    outputStyle: minify ? 'compressed' : 'nested'
  }).on('error', gulpSass.logError))

  pipeline = pipeline.pipe(gulpAutoprefixer({
    overrideBrowserslist: require('./package.json').browserslist,
    cascade: !minify
  }))

  if (sourcemaps) {
    pipeline = pipeline.pipe(gulpSourcemaps.write('.'))
  }

  return pipeline.pipe(dest(root('public/vendor/css')))
}

// -------------------------------------------------------------------------------
// Build tasks

const buildSassProdTask = function () {
  return buildCss({ minify: true })
}

const cleanTask = function () {
  return del([root('public/vendor/css')], {
    force: true
  })
}

const buildTask = function () {
  return buildCss({ sourcemaps: true })
}

const buildProdTask = series(
  cleanTask,
  buildSassProdTask
)

// -------------------------------------------------------------------------------
// Watch task

const watchTask = function () {
  watch(root(
    'src/vendor/styles/**/*.scss',
    '!src/vendor/styles/**/_*.scss'
  ), buildTask)
}

// -------------------------------------------------------------------------------
// Exports

module.exports = {
  cleanup: cleanTask,
  build: buildTask,
  'build-prod': buildProdTask,
  watch: watchTask
}
