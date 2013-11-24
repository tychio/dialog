module.exports = function (grunt) {
    grunt.initConfig({
        jasmine: {
            test: {
                src: 'dialog.js',
                options: {
                    helpers: 'unit/dialog_spec.js',
                    spec: 'SpecRunner.html',
                    vendor: 'demo/jquery.min.js'
                }
            }
        },
        uglify: {
            compile: {
                files: {
                    'dialog.min.js': 'dialog.js'
                }
            }
        },
        stylus: {
            compile: {
                files: {
                    'demo/dialog.css': 'build/style/demo.styl'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('default', ['jasmine', 'uglify', 'stylus']);
};