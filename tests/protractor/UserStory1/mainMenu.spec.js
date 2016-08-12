(function () {
    'use strict';
    describe('I am on the main page and there is a menu on the header bar, i tab that menu', function() {
        browser.get('http://localhost:8080');

        var menuButton = element(by.css('.navbar-toggle'));
        menuButton.click();
        browser.waitForAngular();

        it('Should expand and display 3 elements', function(){
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

        it('Should collapse', function(){
          var menuButton = element(by.css('.navbar-toggle'));
          menuButton.click();
          browser.waitForAngular();
          expect(menuButton.getAttribute('class')).toContain('collapse');
        });
      });
}());
