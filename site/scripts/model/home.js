define(['jQuery', 'Backbone'], function($, Backbone, undefined){
  
    var Model = Backbone.Model.extend({ // private
      defaults:{
        author:'Halle',
        title:'Barry',
        url:null,
        data:null
      },
      parse:function(xmlResponse) {
        this.set('data', xmlResponse);
        var xml = this.get('data');
        
        console.group('PARSE');
          console.log('xml:\t', xml);
         console.groupEnd(); 
      },
      initialize:function(){

      }

    }); // End Model = Backbone.Model.extend    

  var _fnc = {
    instance:null,
    getInstance:function(options){ // defines Model as a singleton
      if(!!_fnc.instance){
        return _fnc.instance;
      }else{
        _fnc.instance = new Model({url:options.url});        
      }
      return _fnc.instance;
    }
  }; // End _fnc

  return{fnc:_fnc};

}); // End require(['jQuery', 'Backbone'] ...




