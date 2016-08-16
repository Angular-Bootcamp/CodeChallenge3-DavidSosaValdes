var screenshot = require('../helpers/screenshot.js');

describe('I am on caught page', function() {
  browser.get('/#/caught');
  describe('I open the main menu', function(){
    var menuButton = element(by.css('.navbar-toggle'));
    menuButton.click();
    browser.waitForAngular();

    describe('I select the "ALL POKEMON" item menu', function(){
      var firstMenu = element.all(by.css('pk-menu-item')).first(); // All pokemon
      firstMenu.click();
      browser.waitForAngular();

      it('Should see 150 pokemons', function(){
        var pokemons = element.all(by.repeater('pokemon in pokemons'));
        expect(pokemons.count()).toBe(150);
        browser.takeScreenshot().then(function (png) {
          screenshot.write(png, './UserStory2/screenshots/allPokemons.png');
        });
      });
    });
  });
});
