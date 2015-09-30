define(['jQuery', 'Backbone', 'util'], function($, Backbone, util, undefined){
    
    var Model = Backbone.Model.extend({ // private
      defaults:{
        url:'../CFUW_Malaika/data/board.xml',
        idAttribute:'homeId',
        arryTemplateData:'',
        cid:'boardMembersId',
        data:null
      },
      successHttpResponse:function hasSuccess(paramXmlResponse){
        var xmlResponse = paramXmlResponse;   
        var hash = util.fnc.parseXmlToJson(xmlResponse, {childContainerTag:'members', firstChildTag:'member'});
        this.set('arryTemplateData', hash.pageData);                 
        this.set('pageTitle', hash.pageTitle);
      },          
      parse:function(xmlResponse) {
        this.set('data', xmlResponse);
        var xml = this.get('data');
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
        _fnc.instance = new Model();        
      }
      return _fnc.instance;
    }
  }; // End _fnc

  return{fnc:_fnc};

}); // End require(['jQuery', 'Backbone'] ...




