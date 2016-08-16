var screenshot = require('../helpers/screenshot.js');

describe('I am on the main page of pokedex', function(){
  it('each entry will display the pokemons image thumbnail, name, number and type ', function(){
    browser.get('/#/all');
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

  it('The list should be ordered by ascending Pokémon number', function(){
    browser.get('/#/all');
    var orderType = element(by.css('.pokemon-order-action'));
    expect(orderType.getAttribute('class')).not.toContain('active');
    browser.takeScreenshot().then(function (png) {
      screenshot.write(png, './UserStory2/screenshots/pokemonsAscOrder.png');
    });
  });
});
