var screenshot = require('../helpers/screenshot.js');

describe('I am on the main page', function() {
  describe('I tab on the menu in the header bar', function(){
    var mainPage = require('../pageObjects/pkMainPage.js');
    var page = new mainPage();
    page.get();

    it('Should expand and display 3 elements', function(){
      var menuButton = page.menu.button.get();
      menuButton.click();
      browser.waitForAngular();

      var menuElements = page.menu.elements.get();
      var countExpected = 3;
      expect(menuElements.count()).toBe(countExpected);

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
      var menuButton = page.menu.button.get();
      menuButton.click();
      browser.waitForAngular();

      var classExpected = 'collapse';
      expect(menuButton.getAttribute('class')).toContain(classExpected);

      browser.takeScreenshot().then(function (png) {
        screenshot.write(png, './UserStory1/screenshots/collapsedMenu.png');
      });
    });
  });
});
