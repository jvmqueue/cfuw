define(['jQuery', 'Backbone', 'util'], function($, Backbone, util, undefined){
    
    var Model = Backbone.Model.extend({ // private
      defaults:{
        idAttribute:'homeId',
        arryTemplateData:'',
        blnSetBackgroundOpacity:false,
        cid:'homeId',
        data:null,
        tagsXml:null
      },
      parse:function(paramXmlResponse){
        var xmlResponse = paramXmlResponse;   
        var tagsXml = this.get('tagsXml');
        var hash = util.fnc.parseXmlToJson(xmlResponse, {childContainerTag:'members', firstChildTag:'member'});
        this.set('arryTemplateData', hash.pageData);                 
        this.set('pageTitle', hash.pageTitle);
      },
      initialize:function(){
        this.set('blnSetBackgroundOpacity', false);
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




