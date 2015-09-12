define(['jQuery', 'Backbone'], function($, Backbone, undefined){
  
    var Model = Backbone.Model.extend({ // private
      defaults:{
        author:'Halle',
        title:'Barry',
        url:'https://www.youtube.com',
        data:null
      },
      initialize:function(){

      },
      sync:function(param){
        for(var name in arguments){
          console.group('SYNC');
            console.log('name:\t', name);
            console.log('arguments[name]:\t', arguments[name]);
           console.groupEnd(); 
        }
      }
      /*TODO: GET board.xml*/
    }); // End Model = Backbone.Model.extend    

  var _fnc = {
    instance:null,
    getInstance:function(){ // defines Model as a singleton
      if(!!_fnc.instance){
        console.group('GET INSTANCE');
          console.log(':\t', 'Is instantiated');
         console.groupEnd(); 
        return _fnc.instance;
      }else{
        _fnc.instance = new Model();        
      }
      return _fnc.instance;
    }
  }; // End _fnc

  return{fnc:_fnc};

}); // End require(['jQuery', 'Backbone'] ...




