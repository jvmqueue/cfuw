define(['jQuery', 'Backbone', 'commonModelDefaults', 'util'], function($, Backbone, commonModelDefaults, util, undefined){
    'use strict';
    var Model = Backbone.Model.extend({ // private
      defaults:{
        idAttribute:'contactUsId',
        cid:'contactUsId'
      },
      parse:function(paramXmlResponse){
        var xmlResponse = paramXmlResponse;
        var tagsXml = this.get('tagsXml'); // set in View 
        var tagsXmlChildsCommon = this.get('tagsXmlChildsCommon');
        var hash = util.fnc.parseXmlToJson(xmlResponse, 
              {childContainerTag:tagsXml[0], 
                firstChildTag:tagsXml[1],
                tagsXmlChildsCommon:tagsXmlChildsCommon});          
        this.set('arryTemplateData', hash.pageData);                 
        this.set('pageTitle', hash.pageTitle);
        this.set('hashCssClassToSet', hash.hashNodeClass);
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




