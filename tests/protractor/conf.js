exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './pkList/elementInit.spec.js'
  ],
  onPrepare: function(){
    browser.driver.manage().window().setPosition(0,0);
    browser.driver.manage().window().setSize(411, 731); // Nexus 5 - Mobile size
  }
};
