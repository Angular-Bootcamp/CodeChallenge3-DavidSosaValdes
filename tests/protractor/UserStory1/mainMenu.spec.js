describe('I am on the main page and there is a menu on the header bar', function() {
  describe('I click on that menu', function(){
    it('Should expand and display 3 elements', function(){
      browser.get('http://localhost:8080');

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
    });

    describe('I close the that menu on click', function(){
      it('Should collapse', function(){
        var menuButton = element(by.css('.navbar-toggle'));
        menuButton.click();
        browser.waitForAngular();

        expect(menuButton.getAttribute('class')).toContain('collapse');
      });
    });
  });
});
