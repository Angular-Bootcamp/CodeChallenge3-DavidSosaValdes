var screenshot = require('../helpers/screenshot.js');

describe('I am on the main page', function() {
  describe('I tab on the menu in the header bar', function(){
    browser.get('/#/all');

    it('Should expand and display 3 elements', function(){
      var menuButton = element(by.css('.navbar-toggle'));
      menuButton.click();
      browser.waitForAngular();

      var menuElements = element.all(by.css('pk-menu-item'));
      expect(menuElements.count()).toBe(3);
      var menuElementsTextExpected = [
          'ALL POKEMON',
          'CAUGHT POKEMON',
          'BATTLE BOX'
      ];
      for (var i = 0; i < 3; i++) {
        expect(menuElements.get(i).getText()).toBe(menuElementsTextExpected[i]);
      }
      browser.takeScreenshot().then(function (png) {
        screenshot.write(png, './UserStory1/screenshots/showingMenu.png');
      });
    });

    it('Should collapse', function(){
      var menuButton = element(by.css('.navbar-toggle'));
      menuButton.click();
      browser.waitForAngular();

      expect(menuButton.getAttribute('class')).toContain('collapse');
      browser.takeScreenshot().then(function (png) {
        screenshot.write(png, './UserStory1/screenshots/collapsedMenu.png');
      });
    });
  });
});
