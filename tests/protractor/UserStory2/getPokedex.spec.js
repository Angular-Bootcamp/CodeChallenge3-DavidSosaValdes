(function () {
  'use strict';
  describe('I am on x page, next i open the main menu and select the "ALL POKEMON" menu', function() {
    browser.get('http://localhost:8080/#/caught');

    var menuButton = element(by.css('.navbar-toggle'));
    menuButton.click();
    browser.waitForAngular();

    var firstMenu = element.all(by.css('pk-menu-item')).first(); // All pokemon
    firstMenu.click();
    browser.waitForAngular();

    it('Should see all the pokemons', function(){
      var pokemons = element.all(by.repeater('pokemon in pokemons'));
      expect(pokemons.count()).toBe(150);
    });

    it('And the list will be ordered by ascending Pokémon number', function(){
      var orderType = element(by.css('.pokemon-order-action'));
      expect(orderType.getAttribute('class')).not.toContain('active');
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
    });
  });
}());
