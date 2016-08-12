describe('I use the ng-repeater of the pokedex on main page', function() {
  it('Shows the pokemon info', function(){
    browser.get('http://localhost:8080');

    var pokemons = element.all(by.repeater('pokemon in pokemons'));
    expect(pokemons.count()).not.toBeLessThan(0);
  });

});
