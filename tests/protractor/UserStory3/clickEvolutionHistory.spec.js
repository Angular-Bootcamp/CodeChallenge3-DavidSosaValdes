var screenshot = require('../helpers/screenshot.js');

describe('I am on "ALL POKEMON" page', function(){
  describe('I select the first pokemon on the list', function() {
    describe('I tab on the second evolution line', function(){
      describe('I click on the return action', function(){

        beforeEach(function(){
          browser.get('/#/all');

          var firstPokemon = element.all(by.binding('name')).first();
          firstPokemon.click();
          browser.waitForAngular();

          var firstEvolutionPokemon = element(by.repeater('evolution in selPokemon.evolutions').row(1));
          firstEvolutionPokemon.click();
          browser.waitForAngular();

          var returnAction = element(by.id('return-action'));
          returnAction.click();
          browser.waitForAngular();
        });

        it('Should see the history pokemon name', function(){
          var expected = {
            name: 'bulbasaur'
          };
          var pkName = element(by.binding('selPokemon.name'));
          expect(pkName.getText()).toMatch(expected.name);

          browser.takeScreenshot().then(function(png){
            screenshot.write(png, './UserStory3/screenshots/pokemonHistoryEvolutionInfo.png');
          });
        });
      });
    });
  });
});
