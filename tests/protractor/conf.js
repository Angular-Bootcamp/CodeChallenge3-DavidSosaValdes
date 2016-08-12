exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  restartBrowserBetweenTests: false,
  specs: [
    './UserStory1/mainMenu.spec.js',
    './UserStory2/getPokedex.spec.js',
    './UserStory2/descOrderPokedex.spec.js'
  ],
  capabilities: {
    'browserName': 'chrome',
    'binary': 'C:/Users/david.sosa.valdes/Downloads/chromedriver.exe',
    shardTestFiles: true,
    maxInstances: 3 // Running specs in parallel
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
