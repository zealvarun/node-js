module.exports = function(grunt) {

    var buildFiles = ['gruntfile.js', 'build/**/*.js', 'server.js'];

    var jsFiles = ['gruntfile.js', 'server.js'];

    var cssFiles = [

        'public/tool/**/*.css',

        //app.css is last
        'public/css/app.css'
    ];

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

   // grunt.loadTasks('build/tasks');

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        jshint: {
            all: [buildFiles, jsFiles],
            options: {
                curly: true,
                eqeqeq: true,
                immed: false, // suppress outer closure warning
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                browser: true,
                jquery: true,
                smarttabs: true,
                strict: false,
                devel: true,
                scripturl: true,
		esversion:6,
               /* globals: {
                    ga: true,
                    exports: true,
                    Globalize: true,
                    d3: true,
                    Base64: true,
                    nicEditors: true,
                    nicEditor: true,
                    Galleria: true,
                    docCookies: true,
                    Handlebars: true,
                    charcoal: true,
                    _:true,
                    moment:true,
                    Chart:true,
                    io:true,
                    Notification:true
                }*/
            }
        },
        csslint: {
		src: cssFiles,
            options: {
               // src: cssFiles,
                rules: {
                    'adjoining-classes': false,
                    'important': false,
                    'duplicate-background-images': false,
                    'box-model': false,
                    'font-faces': false,
                    'box-sizing': false,
                    'zero-units': false,
                    'outline-none': false
                }
            }
        },
        concat: {
            css: {
                src: cssFiles,
                dest: 'public/dist/production.css'
            },
            js: {
                src: jsFiles,
                dest: 'public/dist/production.js'
            }
        },
        cssmin: {
            compress: {
                files: {
                    'public/dist/production.min.css': ['public/dist/production.css']
                }
            },
            compressAdmin: {
                files: {
                    'public/theme-dist/css/AdminLTE.min.css': ['public/theme-dist/css/AdminLTE.css']
                }
            }
        },
        uglify: {
            compress: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/dist/production.min.js': ['public/dist/production.js']
                }
            }
        },
        clean: {
            dist: ['public/dist/*.js', 'public/dist/*.css', 'public/dist/image']
        },
        copy: {
          main: {
            cwd: 'public/templates',  // set working folder / root to copy
            src: '**/*',           // copy all files and subfolders
            dest: 'public/dist/templates',   // destination folder
            expand: true     // required when using cwd
          }
        }
    });

    // Production task.
    grunt.registerTask('prod', ['clean', 'jshint', 'csslint', 'concat', 'cssmin', 'uglify', 'imagerustler', 'generateappsvg']);
    grunt.registerTask('deploy', ['clean', 'concat', 'cssmin', 'uglify', 'imagerustler', 'generateappsvg']);
    // Dev mode: same as prod.
    //grunt.registerTask('default', ['prod']);
    grunt.registerTask('default', ['clean', 'jshint', 'csslint', 'concat','uglify','copy']);

    console.log('\nGrunt executed at: ' + new Date() + '.\n');
};


const express = require('express');
const app = express();
const port = 3000;

(function(){
app.use((request, response, next) => {
  console.log(request.headers);
  next();
});

app.use((request, response, next) => {
  request.chance = Math.random();
  next();
});

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

//app.get('/', (request, response) => {
 // throw new Error('oops')
//})

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err);
  response.status(500).send('Something broke!');
});

app.listen(port);

  //console.log(`server is listening on ${port}`)
})();
