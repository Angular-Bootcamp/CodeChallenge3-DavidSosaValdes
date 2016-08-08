describe('I select first pokemon on the list', function() {

  beforeEach(function(){
    browser.get('http://localhost:8080');

    var firstPokemon = element.all(by.binding('name')).first();

    firstPokemon.click();
    browser.waitForAngular();
  });

  it('Shows the pokemon info', function(){
    var actualName = element(by.id('selected-pokemon-name'));
    var expectedName = 'bulbasaur';

    expect(actualName.getText()).toMatch(expectedName);
  });

  it('Should hide the main list element', function(){
    var pkList = element(by.id('pokedex-list'));

    expect(pkList.getAttribute('class')).toContain('ng-hide');
  });
});
