//import gulp library and that require reference to nodemon library
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

    //call task method para-string , function ; 
gulp.task('default',function(){
    nodemon({                       //nodeman accepts json arguments
        script:'app.js',
        ext:'js',
        env:{
            PORT:8000
        },
        ignore:['./node_modules/**']   //ignores any .js files declared in node_module
    })
    .on('restart',function(){       //nodemon.on method....
        console.log('Restarting...');
    });
});

gulp.task('test',function(){
    env({vars: {ENV:'Test'}});
    gulp.src('Tests/*.js',{read: false})
        .pipe(gulpMocha({reporter:'nyan'}))
})