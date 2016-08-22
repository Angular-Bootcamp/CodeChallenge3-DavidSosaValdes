var screenshot = require('../helpers/screenshot.js');

describe('I am on "ALL POKEMON" page', function(){
  describe('I select the first pokemon on the list', function() {
    browser.get('/#/all');

    var firstPokemon = element.all(by.binding('name')).first();
    firstPokemon.click();
    browser.waitForAngular();

    describe('I tab on the second evolution line', function(){
      var firstEvolutionPokemon = element(by.repeater('evolution in selPokemon.evolutions').row(1));
      firstEvolutionPokemon.click();
      browser.waitForAngular();

      describe('Shows the pokemon info', function(){
        var expected = {
          name: 'venusaur',
          notEvolution: 'This Pokémon is not part of an evolutionary line'
        };

        it('Should see the pokemon name', function(){
          var pkName = element(by.binding('selPokemon.name'));
          expect(pkName.getText()).toMatch(expected.name);
        });

        if('Should see the label on the evolution list', function(){
          var pkLegend = element(by.css('.pokemon-evolutions'));
          expect(pkLegend.getText()).toMatch('This Pokémon is not part of an evolutionary line');
        });

        browser.takeScreenshot().then(function(png){
          screenshot.write(png, './UserStory3/screenshots/pokemonSecondEvolutionInfo.png');
        });
      });
    });
  });
});