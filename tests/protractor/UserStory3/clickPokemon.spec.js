var screenshot = require('../helpers/screenshot.js');

describe('I am on "ALL POKEMON" page', function(){
  describe('I select the first pokemon on the list', function() {
    describe('The pokedex shows the pokemon info', function(){

      beforeEach(function(){
        browser.get('/#/all');

        var firstPokemon = element.all(by.binding('name')).first();
        firstPokemon.click();
        browser.waitForAngular();
      });

      var expected = {
        name: 'bulbasaur',
        number: '001',
        height: '7',
        weight: '6.9',
        type: 'poison',
        image: 'true',
        description: true,
        hiddenAbility: 'chlorophyll',
        location: 'Starter pokemon on Kanto Region'
      };

      it('Should hide the main list element', function(){
        var pkList = element(by.id('pokedex-list'));

        expect(pkList.getAttribute('class')).toContain('ng-hide');
        browser.takeScreenshot().then(function(png){
          screenshot.write(png, './UserStory3/screenshots/hidePokemonList.png');
        });
      });

      it('Should see the pokemon name', function(){
        var pkName = element(by.binding('selPokemon.name'));
        expect(pkName.getText()).toMatch(expected.name);

        browser.takeScreenshot().then(function(png){
          screenshot.write(png, './UserStory3/screenshots/pokemonInfo.png');
        });
      });

      it('Should see the pokemon number', function(){
        var pkNumber = element(by.binding('selPokemon._id'));
        expect(pkNumber.getText()).toMatch(expected.number);
      });

      it('Should see the pokemon weight', function(){
        var pkWeight = element(by.binding('selPokemon.weight'));
        expect(pkWeight.getText()).toMatch(expected.weight);
      });

      it('Should see the pokemon height', function(){
        var pkHeight = element(by.binding('selPokemon.height'));
        expect(pkHeight.getText()).toMatch(expected.height);
      });

      it('Should see the pokemon description', function(){
        var pkDescription = element(by.binding('selPokemon.description'));
        expect(pkDescription.getText()).not.toBe((!expected.description).toString());
      });

      it('Should see at least one of the pokemon types', function(){
        var pkType = element(by.repeater('type in selPokemon.types').row(0));
        expect(pkType.getAttribute('class')).toContain(expected.type);
      });

      it('Should see the pokemon image', function(){
        var pkImage = element(by.css('.pokemon-image img'));
        expect(pkImage.getAttribute('complete')).toBe(expected.image);
      });

      it('Should see at least one of the pokemon hidden abilities', function(){
        var pkHiddenAbility = element(by.repeater('ability in selPokemon.abilities').row(0));
        expect(pkHiddenAbility.getText()).toBe(expected.hiddenAbility);
      });

      it('Should see the pokemon location', function(){
        var pkLocation = element(by.css('.pokemon-location'));
        expect(pkLocation.getText()).toMatch(expected.location);
      });
    });
  });
});
