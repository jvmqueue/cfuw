define(['jQuery', 'Backbone'], function($, Backbone, undefined){
  

  var _fnc = {
    Model:Backbone.Model.extend({
      defaults:{
        author:'Halle',
        title:'Barry',
        url:'https://www.youtube.com'
      }
    })  
  };

  return{fnc:_fnc};


}); // End require(['jQuery', 'Backbone'] ...




