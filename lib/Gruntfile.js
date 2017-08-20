module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        // the files to concatenate
        src: ['../app/**/*.js'],
        // the location of the resulting JS file
        dest: '../dist/app.js'
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope", "firebase", "app", "google", "moment" ],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true}
      },
      files: ['../app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../scss/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint', 'concat']
      },
      sass: {
        files: ['../scss/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch', 'concat']);
};
