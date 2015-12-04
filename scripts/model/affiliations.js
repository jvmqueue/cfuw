define(['jQuery', 'Backbone', 'commonModelDefaults', 'util'], function($, Backbone, commonModelDefaults, util, undefined){
    
    var Model = Backbone.Model.extend({ // private
      defaults:{
        idAttribute:'affiliationsId',
        cid:'affiliationsId'
      },
      parse:function(paramXmlResponse){
        var xmlResponse = paramXmlResponse;   
        var tagsXml = this.get('tagsXml');
        var hash = util.fnc.parseXmlToJson(xmlResponse, {childContainerTag:'members', firstChildTag:'member'});
        this.set('arryTemplateData', hash.pageData);                 
        this.set('pageTitle', hash.pageTitle);
      },
      initialize:function(){
        for(var name in commonModelDefaults.properties){ // composition, common model default values defined in commonModelDefaults.js
           this.set(name, commonModelDefaults.properties[name]);
        }       
      }

    }); // End Model = Backbone.Model.extend    

  var _fnc = {
    instance:null,
    getInstance:function(){ // defines Model as a singleton
      if(!!_fnc.instance){
        return _fnc.instance;
      }else{
        _fnc.instance = new Model();
      }
      return _fnc.instance;
    }
  }; // End _fnc

  return{fnc:_fnc};

}); // End require(['jQuery', 'Backbone'] ...




