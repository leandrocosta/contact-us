module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                ignores: ['app/vendor/**'],
            },
            gruntfile: {
                src: 'Gruntfile.js',
            },
            app: {
                src: 'app/**/*.js',
            },
            test: {
                src: 'test/**/*.js',
            },
        },

        qunit: {
            all: ['test/**/*.html'],
        },

        watch: {
            options: {
                livereload: true,
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
            },
            test: {
                files: [
                    '<%= jshint.test.src %>',
                    '<%= jshint.app.src %>',
                    '<%= qunit.all %>',
                    'app/**/*.html'],
                tasks: ['jshint:test', 'qunit']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8888,
                    hostname: '*',
                    base: 'app',
                }
            },
            test: {
                options: {
                    port: 8889,
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('test', ['jshint', 'qunit']);

    // Default task.
    grunt.registerTask('default', ['connect', 'watch']);
};
