require(['jQuery', 'Backbone', 'homeModel', 'homeView', 'util', 'exception'], 
  function($, Backbone, homeModel, homeView, util, exception, undefined){

  var w = window, d = document;
  var modelHome = null;


  var Models = Backbone.Collection.extend({

  });



  var interval = w.setInterval(function(){ // we don't need jQuery to wait for DOM
    if(d.getElementsByTagName('div').length > 1){
      w.clearInterval(interval);
      var view = new homeView.View(); // TODO: refactor main.js - - > mainController.js then define homeView.js
    }
  }, 33);
  


}); // End require(['jQuery', 'Backbone'] ...




