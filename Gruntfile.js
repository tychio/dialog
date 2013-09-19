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
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);
};