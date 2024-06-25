const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Caminhos dos arquivos
const paths = {
    styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
    },
    images: {
    src: 'src/images/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'dist/images'
    },
    scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
    }
};

// Tarefa para compilar SASS em CSS e minificar o CSS
function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para comprimir imagens
function images() {
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Tarefa para comprimir e concatenar JavaScript
function scripts() {
    return gulp.src(paths.scripts.src)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Tarefa para observar mudanças nos arquivos
function watchFiles() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// Definindo tarefas públicas
const build = gulp.series(gulp.parallel(styles, images, scripts));
const watch = gulp.series(build, watchFiles);

// Exportando tarefas
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.build = build;
exports.watch = watch;
exports.default = build;