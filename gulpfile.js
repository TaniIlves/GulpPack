'use strict'

/* Declare modules */
const { src, dest, watch, parallel, series } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssbeautify = require('gulp-cssbeautify');
const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const panini = require('panini');
const imagemin = require('gulp-imagemin');
const del = require('del');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const woff = require('gulp-ttf2woff2');

var fileExists = require('file-exists');

/* Paths */
const srcPath = 'src/'
const distPath = 'dist/'
// const srcAssetsPath = srcPath + 'assets/'
// const distAssetsPath = distPath
const pugPath = srcPath + 'pages/'
const tplPath = srcPath + 'templates/'

const path = {
    build: {
        html: distPath,
        css: distPath + 'css/',
        js: distPath + 'js/',
        images: distPath + 'images/',
        fonts: distPath + 'fonts/',
    },
    src: {
        html: tplPath + '*.html',
        pug: srcPath + 'pages/*.pug',
        css: srcPath + 'scss/*.scss',
        js: srcPath + 'js/*.js',
        images: srcPath + 'images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,webmainfest,xml,json}',
        fonts: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}',
    },
    watch: {
        html: tplPath + '**/*.html',
        pug: srcPath + 'pages/**/*.pug',
        css: srcPath + 'scss/*.scss',
        js: srcPath + 'js/*.js',
        images: srcPath + 'images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,webmainfest,xml,json}',
        fonts: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}',
    },
    clean: './' + distPath
}


/* Tasks */
function pages(done) {
    fileExists(pugPath, function (err) {
        if (!err) {
            src(path.src.pug, { base: pugPath })
                .pipe(plumber({
                    errorHandler: function (err) {
                        notify.onError({
                            title: 'PUG Error',
                            message: 'Error: <%= error.message %>'
                        })(err);
                        this.emit('end');
                    }
                }))
                .pipe(
                    pug({
                        pretty: true
                    })
                )
                .pipe(rename('index.html'))
                .pipe(dest(path.build.html))
                .pipe(browserSync.reload({ stream: true }))
        } else {
            src(path.src.html, { base: srcPath + '/templates/' })
                .pipe(plumber())
                .pipe(panini({
                    root: srcPath,
                    layouts: tplPath + 'layouts/',
                    partials: tplPath + 'partials/',
                    helpers: tplPath + 'helpers/',
                    data: tplPath + 'data/'
                }))
                .pipe(dest(path.build.html))
                .pipe(browserSync.reload({ stream: true }))
        }
    });
    return done()
}

function css() {
    return src(path.src.css, { base: srcPath + '/scss/' })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'SCSS Error',
                    message: 'Error: <%= error.message %>'
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded' // 'compressed'
        }))
        .pipe(cssbeautify())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest(path.build.css))

        .pipe(cssnano({
            zindex: false, // Do not allow change z-indexes in CSS
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }))
}

function js() {
    return src(path.src.js, { base: srcPath + '/js/' })
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'JS Error',
                    message: 'Error: <%= error.message %>'
                })(err);
                this.emit('end');
            }
        }))
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(terser())
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }))
}

function images() {
    return src([
        path.src.images + '*.{png,jpg}',
    ], { base: srcPath + '/images/' })
        .pipe(newer(path.src.images))
        .pipe(avif({ quality: 50 }))

        .pipe(src(path.src.images))
        .pipe(newer(path.src.images))
        .pipe(webp())

        .pipe(src(path.src.images))
        .pipe(newer(path.src.images))
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({ stream: true }))
}

function sprite() {
    return src(srcPath + '/images/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/'))
}

function fonts() {
    return src(path.src.fonts, { base: srcPath + '/fonts/' })
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src(path.src.fonts + '*.ttf'))
        .pipe(woff())
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({ stream: true }))
}

function clean() {
    return del(path.clean)
}

function watcher() {
    panini.refresh()
    watch([path.watch.css], css)
    watch([path.watch.js], js)
    watch([path.watch.images], images)
    watch([path.watch.fonts], fonts)
    watch([path.watch.pug], pages)
    watch([path.watch.html], pages)
    browserSync.init({
        server: {
            baseDir: distPath,
            // directory: true
        }
    });
}


const build = series(clean, pages, parallel(css, js, images, fonts))
const dev = series(build, watcher)


/* Executers */
exports.pug = pug
exports.css = css
exports.js = js
exports.images = images
exports.sprite = sprite
exports.fonts = fonts
exports.clean = clean
exports.build = build
exports.dev = dev
