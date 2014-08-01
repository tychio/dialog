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
            },
            coverage: {
                src: 'dialog.js',
                options: {
                    vendor: 'demo/jquery.min.js',
                    specs: 'unit/dialog_spec.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'unit/coverage/coverage.json',
                        report: 'unit/coverage',
                        thresholds: {
                            lines: 80,
                            statements: 70,
                            branches: 60,
                            functions: 85
                        }
                    }
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

    grunt.registerTask('default', ['jasmine:coverage', 'uglify', 'stylus']);
};