const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const sync = require('browser-sync').create();

function clear() {
  return del('build');
}

function bmcss() {
  return src([
    'node_modules/bootstrap/dist/css/bootstrap-grid.css',
    'node_modules/owl.carousel/dist/assets/owl.carousel.css',
    'src/scss/**/*.scss',
  ])
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
      })
    )
    .pipe(concat('bundle.min.css'))
    .pipe(csso({ comments: false }))
    .pipe(dest('build/css'));
}

function bmjs() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/gsap/dist/gsap.js',
    'node_modules/owl.carousel/dist/owl.carousel.js',
    'src/js/*.js',
  ])
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(dest('build/js'));
}

function pics() {
  return src('src/img/**/*.*').pipe(dest('build/img'));
}

function fonts() {
  return src('src/fonts/**/*.*').pipe(dest('build/fonts'));
}

function markup() {
  return src(['src/**/*.html', '!src/**/_*.html'])
    .pipe(
      include({
        prefix: '@@',
      })
    )
    .pipe(dest('build'));
}

function serve() {
  sync.init({
    server: {
      baseDir: './build',
    },
    port: 3000,
    notify: false,
  });

  watch('src/scss/**/*.scss', series(bmcss)).on('change', sync.reload);
  watch('src/js/**/*.js', series(bmjs)).on('change', sync.reload);
  watch('src/img/**/*.*', series(pics)).on('change', sync.reload);
  watch('src/fonts/**/*.*', series(fonts)).on('change', sync.reload);
  watch('src/**/*.html', series(markup)).on('change', sync.reload);
}

exports.default = series(clear, bmcss, bmjs, pics, fonts, markup, serve);
