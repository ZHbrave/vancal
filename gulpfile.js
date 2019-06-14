//引入gulp工具
const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),//压缩HTML的插件
      minifyCss = require('gulp-minify-css'),//压缩CSS的插件
      sass = require('gulp-sass'),//编译sass的的插件
      uglify = require('gulp-uglify'),//压缩js的插件
      babel = require('gulp-babel'),//把es6转化为es5的插件
      connect = require('gulp-connect');//开服务器的插件

//制定一个html任务
gulp.task('html',()=>{
    //压缩html
    gulp.src('src/**/*.html')
    .pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false,//不删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS   
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})

//制定css任务
gulp.task('css',()=>{
    //除了module里面的css都要编译
  //   gulp.src(['src/css/**/*.scss',"!src/module/*.scss"])
      
    //编译所有的scss
    gulp.src('src/css/**/*.scss')

    //编scss
    .pipe(sass())
    //压缩css
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})

//制定js任务
gulp.task('js',()=>{
  gulp.src('src/js/**/*.js')
  //将es5转换为es6
  .pipe(babel({
    presets: ['@babel/env']
  }))
  //压缩js
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload())
})

//制定libs任务
gulp.task('libs',()=>{
  gulp.src('src/libs/**/*')
  .pipe(gulp.dest('dist/libs'));
})
//制定img任务
gulp.task('imgs',()=>{
  gulp.src('src/imgs/**/*')
  .pipe(gulp.dest('dist/imgs'));
})
//监听
gulp.task('watch',()=>{
  gulp.watch('src/**/*.html',['html']);
  gulp.watch('src/css/**/*.scss',['css']);
  gulp.watch('src/js/**/*.js',['js']);
})

//开服务器
gulp.task('server',()=>{
  connect.server({
    root:'dist',
    port:5658,
    livereload:true
  });
})
gulp.task('default', ['html', 'css', 'js', 'libs', 'imgs', 'server', 'watch']);