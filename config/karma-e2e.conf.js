module.exports = function(config){
    config.set({
    basePath : '../',
    files : [
        'test/e2e/**/*.js'
    ],

    autoWatch : false,

    browsers : ['Chrome'],

    frameworks: ['ng-scenario'],

    singleRun : false,

    proxies : {
        '/': 'http://localhost:60779/clientApp/app'
    },   
    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-scenario'
            ],

    junitReporter : {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    },
  reporters: ['progress', 'html'],

  htmlReporter: {
      outputFile: 'test/units.html'
  }

})}

