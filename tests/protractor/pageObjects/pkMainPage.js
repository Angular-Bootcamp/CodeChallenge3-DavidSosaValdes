'use strict';

var pkMainPage = function(){
  var menuItems = element.all(by.css('pk-menu-item'));
  var menuButton = element(by.css('.navbar-toggle'));

  return {
    get: function (){
      browser.get('/#/all');
    },
    menu: {
      elements: {
        get: function(){
          return menuItems;
        }
      },
      button: {
        get: function(){
          return menuButton;
        }
      }
    }
  };
};

module.exports = pkMainPage;
