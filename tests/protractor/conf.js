exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './UserStory1/MainMenu.spec.js'
    //'./UserStory1/'
  ],
  capabilities: {
      'browserName': 'chrome',
      'binary': 'C:/Users/david.sosa.valdes/Downloads/chromedriver.exe'
  },
  onPrepare: function(){
    browser.driver.manage().window().setPosition(0,0);
    browser.driver.manage().window().setSize(411, 731); // Nexus 5 - Mobile size
  }
};
