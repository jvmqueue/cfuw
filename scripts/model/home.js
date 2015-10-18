define(['jQuery', 'Backbone', 'util', 'basePath'], function($, Backbone, util, base){
    
    var Model = Backbone.Model.extend({ // private
      defaults:{
        url:base.basePath() + 'home.xml',
        idAttribute:'homeId',
        arryTemplateData:'',
        cid:'homeId',
        data:null
      },
      parse:function(paramXmlResponse){
        var xmlResponse = paramXmlResponse;   
        var hash = util.fnc.parseXmlToJson(xmlResponse, {childContainerTag:'members', firstChildTag:'member'});
        this.set('arryTemplateData', hash.pageData);                 
        this.set('pageTitle', hash.pageTitle);
      },
      initialize:function(){

      }

    }); // End Model = Backbone.Model.extend    

  var _fnc = {
    instance:null,
    getInstance:function(options){ // defines Model as a singleton
      var strModelId = options.modelId;
      if(!!_fnc.instance){
        return _fnc.instance;
      }else{
        _fnc.instance = new Model({id:strModelId});
      }
      return _fnc.instance;
    }
  }; // End _fnc

  return{fnc:_fnc};

}); // End require(['jQuery', 'Backbone'] ...



