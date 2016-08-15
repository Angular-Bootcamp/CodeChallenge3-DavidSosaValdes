var screenshot = require('../helpers/screenshot.js');

describe('I am on caught page, next i open the main menu and select the "ALL POKEMON" menu', function() {
  describe('I open the main menu', function(){
    browser.get('/#/caught');
    var menuButton = element(by.css('.navbar-toggle'));
    menuButton.click();
    browser.waitForAngular();

    describe('I select the "ALL POKEMON" item menu', function(){
      var firstMenu = element.all(by.css('pk-menu-item')).first(); // All pokemon
      firstMenu.click();
      browser.waitForAngular();
      browser.sleep(2000);

      it('Should see all the pokemons', function(){
        var pokemons = element.all(by.repeater('pokemon in pokemons'));
        expect(pokemons.count()).toBe(150);
        browser.takeScreenshot().then(function (png) {
          screenshot.write(png, './UserStory2/screenshots/allPokemons.png');
        });
      });

      it('And the list will be ordered by ascending Pokémon number', function(){
        var orderType = element(by.css('.pokemon-order-action'));
        expect(orderType.getAttribute('class')).not.toContain('active');
        browser.takeScreenshot().then(function (png) {
          screenshot.write(png, './UserStory2/screenshots/pokemonsAscOrder.png');
        });
      });

      it('And each entry will display the pokemons image thumbnail, name, number and type ', function(){
        var pkRow = element(by.repeater('pokemon in pokemons').row(0));
        var pkImage = pkRow.element(by.tagName('img'));
        var pkName = pkRow.element(by.binding('pokemon.name'));
        var pkNumber = pkRow.element(by.binding('pokemon._id'));
        var pkType = pkRow.element(by.repeater('type in pokemon.types').row(0));

        expect(pkImage.getAttribute('complete')).toBe('true');
        expect(pkName.getText()).toMatch('bulbasaur');
        expect(pkNumber.getText()).toMatch('#001');
        expect(pkType.getAttribute('class')).toContain('poison');
        browser.takeScreenshot().then(function (png) {
          screenshot.write(png, './UserStory2/screenshots/pokemonEntry.png');
        });
      });

      it('Should be sorted by descending Pokémon number', function(){
        browser.get('/#/all');
        var orderAction = element(by.css('img.reorder-list'));
        orderAction.click();
        browser.waitForAngular();

        var pkName = element(by.repeater('pokemon in pokemons').row(0).column('pokemon.name'));
        expect(pkName.getText()).toMatch('mewtwo');
        browser.takeScreenshot().then(function (png) {
          screenshot.write(png, './UserStory2/screenshots/descendingOrderPokedex.png');
        });
      });
    });
  });
});
