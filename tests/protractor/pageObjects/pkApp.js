'use strict';

var pkAppObject = function(){
  browser.get('/#/all');
};

pkAppObject.prototype = Object.create({},{
  mainMenu: {
    get: function(){
      return element.all(by.css('pk-menu-item');
    }
  },
  showButton: {
    get: function(){
      return element(by.css('.navbar-toggle'));
    }
  }
});


module.exports = pkAppObject;
