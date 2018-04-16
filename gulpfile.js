var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var minhtml = require('gulp-htmlmin');
var minjs = require('gulp-uglify');
var sequence = require('gulp-sequence');
var server = require('gulp-webserver');
var url = require('url')
var data = require('./json/js.json')

gulp.task('sass',function(){
    gulp.src('css/style.scss')
    .pipe(sass())
    .pipe(mincss())
    .pipe(gulp.dest('dist/css'))
    })

gulp.task('minjs',function(){
    gulp.src('js/js.js')
    .pipe(minjs())
    .pipe(gulp.dest('dist/js'))
    })

gulp.task('jq',function(){
    gulp.src('js/jquery.min.js')
    .pipe(gulp.dest('dist/js'))
    })

gulp.task('swijs',function(){
    gulp.src('js/swiper-3.4.2.min.js')
    .pipe(gulp.dest('dist/js'))
    })

gulp.task('swicss',function(){
    gulp.src('css/swiper-3.4.2.min.css')
    .pipe(gulp.dest('dist/css'))
    })

gulp.task('img',function(){
    gulp.src('img/*')
    .pipe(gulp.dest('dist/img'))
    })

gulp.task('icon',function(){
    gulp.src('font/*')
    .pipe(gulp.dest('dist/font'))
    })

gulp.task('json',function(){
    gulp.src('json/js.json')
    .pipe(gulp.dest('dist/json'))
    })

var options = {
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true
};

gulp.task('minhtml',function(){
    gulp.src('index.html')
    .pipe(minhtml(options))
    .pipe(gulp.dest('dist'))
    })

gulp.task('server',function(){
    gulp.src('dist')
    .pipe(server({
        port:9090,
        open:true,
        livereload:true,
        middleware:function(req,res,next){
            if(/\/login/g.test(req.url)){
                res.setHeader('Content-Type','test/json;charset=UTF-8')
                res.end(JSON.stringify(data))
            }
            next()
        }
    }))
})

gulp.task('default',function(callback){
    sequence('minhtml',['sass','minjs','jq','swijs','swicss','img','icon','json'],'server',callback)
})

