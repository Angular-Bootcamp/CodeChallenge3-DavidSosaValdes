exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8080',
  specs: [
    './**/*.spec.js',
  ],
  suites: {
      story1: './UserStory1/*.spec.js',
      story2: './UserStory2/*.spec.js',
      story3: './UserStory3/*.spec.js'
  },
  capabilities: {
    'browserName': 'chrome',
    'binary': 'C:/Users/david.sosa.valdes/Downloads/chromedriver.exe',
  },
  onPrepare: function(){
    browser.driver.manage().window().setPosition(0,0);
    browser.driver.manage().window().setSize(411, 731); // Nexus 5 - Mobile size
  },
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true
  }
};
