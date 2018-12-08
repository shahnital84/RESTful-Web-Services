//import gulp library and that require reference to nodemon library
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

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
