var screenshot = require('../helpers/screenshot.js');

describe('I open the main menu', function(){
  describe('I select the "ALL POKEMON" item', function(){
    it('Should see 150 pokemons', function(){
      browser.get('/#/caught');

      var menuButton = element(by.css('.navbar-toggle'));
      menuButton.click();
      browser.waitForAngular();

      var firstMenu = element.all(by.css('pk-menu-item')).first(); // All pokemon
      firstMenu.click();
      browser.waitForAngular();

      var pokemons = element.all(by.repeater('pokemon in pokemons'));
      expect(pokemons.count()).toBe(150);
      browser.takeScreenshot().then(function (png) {
        screenshot.write(png, './UserStory2/screenshots/allPokemons.png');
      });
    });
  });
});
