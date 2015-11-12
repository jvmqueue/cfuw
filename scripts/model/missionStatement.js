define(['jQuery', 'Backbone', 'util'], function($, Backbone, util, undefined){
    
    var Model = Backbone.Model.extend({ // private
      defaults:{
        idAttribute:'missionStatementId',
        cid:'missionStatementId',
        arryTemplateData:null,
        blnSetBackgroundOpacity:false,
        pageTitle:{},
        data:null,
        tagsXml:null
      },
      parse:function(paramXmlResponse){ // override parse, because response is XML
        var xmlResponse = paramXmlResponse;
        var tagsXml = this.get('tagsXml');
        var hash = util.fnc.parseXmlToJson(xmlResponse, {childContainerTag:tagsXml[0], firstChildTag:tagsXml[1]}); 


        this.set('arryTemplateData', hash.pageData);
        this.set('pageTitle', hash.pageTitle);
      },
      initialize:function(options){
        this.set('blnSetBackgroundOpacity', false);
        this.set('cid', options.id); // used by view to access model
      }

    }); // End Model = Backbone.Model.extend    

  var _fnc = {
    instance:null,
    getInstance:function(options){ // defines Model as a singleton
      var strModelId = options.modelCid;
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




