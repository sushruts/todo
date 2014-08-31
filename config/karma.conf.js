module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
	  'app/scripts/vendor/jquery-1.9.1.js',
    'app/scripts/vendor/angular.js',
    'app/scripts/vendor/angular-*.js',
    'test/lib/angular/angular-mocks.js',
	  'app/scripts/vendor/bootstrap.js',
    'app/scripts/vendor/draganddrop.js',
    'app/scripts/vendor/require.js',
	  'app/*.js',
    'app/scripts/controllers/*.js',
	  // 'app/scripts/directives/*.js',
	  // 'app/scripts/services/*.js',

    'test/unit/controllersSpec.js'
    ],

    exclude : [

    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}