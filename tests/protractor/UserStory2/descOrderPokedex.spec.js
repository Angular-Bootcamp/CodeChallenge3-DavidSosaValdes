(function () {
  'use strict';
  describe('I am on the main page and tap on the sort button', function(){
    browser.get('http://localhost:8080/#/all');

    var orderAction = element(by.css('img.reorder-list'));
    orderAction.click();
    browser.waitForAngular();

    it('Should be sorted by descending Pokémon number', function(){
      var pokemonName = element(by.repeater('pokemon in pokemons').row(0).column('pokemon.name'));
      expect(pokemonName.getText()).toMatch('mewtwo');
    });
  });
}());
