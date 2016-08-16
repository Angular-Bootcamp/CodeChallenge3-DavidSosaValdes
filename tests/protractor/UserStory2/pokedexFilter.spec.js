var screenshot = require('../helpers/screenshot.js');

describe('I am on "ALL POKEMON" page', function(){
  it('Should filter the pokemon named "dratini"', function(){
    browser.get('/#/all');

    var search = element(by.model('searchEntry'));
    var expectedName = 'dratini';
    search.sendKeys(expectedName);
    browser.waitForAngular();

    var pkRow = element(by.repeater('pokemon in pokemons').row(0));
    var pkName = pkRow.element(by.binding('pokemon.name'));

    expect(pkName.getText()).toMatch(expectedName);
    browser.takeScreenshot().then(function(png){
      screenshot.write(png, './UserStory2/screenshots/filterPokemons.png');
    });
  });
});
