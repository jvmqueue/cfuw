define(['jQuery', 'Backbone', 'commonModelDefaults', 'util'], function($, Backbone, commonModelDefaults, util, undefined){
    'use strict';
    var Model = Backbone.Model.extend({ // private
      defaults:{
        cid:'bookSaleId',
        idAttribute:'bookSaleId'
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

        
/*        window.setTimeout(function(){
          var d = document;
          var node = null;
          var intWidth = null;
          var strInnerHtml = null;
          var intNumChar = null;
          var intRatio = null;
          for(var i=0, len = 2; i <= len; i++){
            node = d.getElementById('centerJustifyText' + i);          
            intWidth = node.offsetWidth;
            strInnerHtml = node.innerHTML;
            intNumChar = strInnerHtml.length
            intRatio = 93/100 * (intWidth/intNumChar);
            node.setAttribute('style', 'text-align:center; letter-spacing:' + intRatio + 'px');
          }


        }, 1111);*/
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




