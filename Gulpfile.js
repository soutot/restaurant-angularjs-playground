//modules
var gulp = require('gulp'),
    //jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    webserver = require('gulp-webserver');

/*const imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant');
*/
//minificadores
var htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify');

//watch
gulp.task('watch', function(){
    gulp.watch('./app/styles/scss/*.scss', ['styles']);
    gulp.watch('/app/scripts/*.js', ['scripts']);
    gulp.watch('/app/images/*', ['images']);
});

//Sass
gulp.task('styles', function() {
    return sass('./app/styles/scss/*.scss', { //diretorio origem do arquivo sass
        //style: 'compressed' //minifica
    })
    .pipe(plumber())
    .pipe(gulp.dest('./app/styles/css')); //diretorio destino do arquivo css
});

//scripts
gulp.task('scripts', function(){ 
    gulp.src('/app/scripts/*.js')
    .pipe(plumber());
    //.pipe(jshint());   
});

//compressão de imagens
/*gulp.task('images',function(){    
    return gulp.src('/app/images/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('/app/images/'));
});
*/
//web server
gulp.task('webserver', function() {
    gulp.src('./') //diretório de origem dos arquivos
    .pipe(webserver({
        port: 3000,
        livereload: true


        //open: 'http://localhost:3000/repom', //caminho do gulp-webserver, comentado pq já é aberto no browser-sync
        /*proxies: [
            {
                source: '/app', //diretório da aplicação
                target: 'http://127.0.0.1:8888/' //caminho da configurada no IIS
            }
        ]*/
    }));    
});

//browser sync
gulp.task('browser-sync', function() {
     browserSync.init({
        proxy: "localhost:3000"
    });
});

//minifica js
gulp.task('minify-scripts', function(){ 
    gulp.src('/app/scripts/*.js')
    .pipe(plumber())
    .pipe(uglify()) 
    .pipe(gulp.dest('dist/js'));
});

//minifica css
gulp.task('minify-styles', function(){ 
    gulp.src('/app/css/*.css')
    .pipe(plumber())
    .pipe(uglify()) 
    .pipe(gulp.dest('dist/css'));
});


//minifica Index
gulp.task('minify-index', function(){    
    gulp.src('/app/*.html') //arquivo origem
    .pipe(htmlmin({collapseWhitespace: true})) //minifica html
    .pipe(gulp.dest('dist/Views/Home')); //diretório destino
});

//minifica tudo
gulp.task('minify', ['minify-template', 'minify-index', 'minify-styles', 'minify-scripts']);

//gera diretório para prod
gulp.task('build', function(){    
    gulp.src('/app/bin/*')
    .pipe(gulp.dest('dist/bin'))
    .pipe(gulp.src('/app/css/*'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.src('/app/DAO/*'))
    .pipe(gulp.dest('dist/DAO'))
    .pipe(gulp.src('/app/EmailTemplates/*'))
    .pipe(gulp.dest('dist/EmailTemplates'))
    .pipe(gulp.src('/app/images/*'))
    .pipe(gulp.dest('dist/images'))
    .pipe(gulp.src('/app/includes/*'))
    .pipe(gulp.dest('dist/includes'))
    .pipe(gulp.src('/app/scripts/*'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.src('/app/views/*'))
    .pipe(gulp.dest('dist/views'))
    .pipe(gulp.src('/app/favicon.ico'))
    .pipe(gulp.dest('dist/Novo'))
    .pipe(gulp.src('/app/global.asax'))
    .pipe(gulp.dest('dist/Novo'))
    .pipe(gulp.src('/app/packages.config'))
    .pipe(gulp.dest('dist/Novo'))
    .pipe(gulp.src('/app//pagamento-frete-pedagio-rodoviario-ciot/principais_termos_setor_transporte.pdf'))
    .pipe(gulp.dest('dist/Novo'))
    .pipe(gulp.src('/app/web.config'))
    .pipe(gulp.dest('dist/Novo'));
});

gulp.task('default',['watch','styles', 'scripts', 'webserver','browser-sync']);
