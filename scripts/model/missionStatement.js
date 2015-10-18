define(['jQuery', 'Backbone', 'util', 'basePath'], function($, Backbone, util, base, undefined){
    
    var Model = Backbone.Model.extend({ // private
      defaults:{
        url:base.basePath() + 'missionStatement.xml',
        idAttribute:'missionStatementId',
        cid:'missionStatementId',
        arryTemplateData:null,
        pageTitle:{},
        data:null
      },
      successHttpResponse:function hasSuccess(paramXmlResponse){ // interface
        var xmlResponse = paramXmlResponse;
      },          
      parse:function(paramXmlResponse){ // override parse, because response is XML
        var xmlResponse = paramXmlResponse;
        var hash = util.fnc.parseXmlToJson(xmlResponse, {childContainerTag:'paragraphs', firstChildTag:'paragraph'});

        this.set('arryTemplateData', hash.pageData);
        this.set('pageTitle', hash.pageTitle);
      },
      initialize:function(paramStrDataPath){
/*        var strDataPath = paramStrDataPath;
        this.set('url', strDataPath);*/
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




