describe('I click the first pokemon on the list', function() {
  it('Should open the description template and shows the pokemon info', function(){
    browser.get('http://localhost:8080');

    var firstPokemon = element.all(by.binding('name')).first();
    var expectedName = 'bulbasaur';

    firstPokemon.click();
    browser.waitForAngular();

    var actualName = element(by.id('selected-pokemon-name'));
    expect(actualName.getText()).toMatch(expectedName);
  });
});
