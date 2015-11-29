define(['jQuery', 'Backbone', 'util'], function($, Backbone, util, undefined){
    
    var Model = Backbone.Model.extend({ // private
      defaults:{
        idAttribute:'boardId',
        arryTemplateData:false,
        blnSetBackgroundOpacity:false,
        blnDataHasBeenSet:false,
        blnAddPaddingTopSmallest:false,
        hashCssClassToSet:{},
        cid:'boardId',
        data:null,
        tagsXml:null,
        tagsXmlChildsCommon:null
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




