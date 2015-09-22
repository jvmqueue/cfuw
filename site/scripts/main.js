require(['jQuery', 'Backbone', 'homeModel', 'homeView', 'util', 'exception'], 
  function($, Backbone, homeModel, homeView, util, exception, undefined){

  var w = window, d = document;
  var modelHome = null;

  var Models = Backbone.Collection.extend({

  });

  var View = Backbone.View.extend({
    tagName:'div',
    el:'div',
    events:{ // must define View.el which is to #navBarTop
      'click #navBarTop':'getModel',
      'click #headColRightLogo':'getHome'
    },
    successHttpResponse:function hasSuccess(paramXmlResponse){
      var xmlResponse = paramXmlResponse;
       util.fnc.parseXmlToJson(xmlResponse);
    },    
    models:new Models(),
    initialize:function(){
      this.render();
    },
    render:function(){
      this.delegateEvents();
    },
    getModel:function(e){ // event delegate for navigation
      var node = e.target;
      var strInnerHtml = node.firstChild.nodeValue.toLowerCase();
      var strUrl = '';

      switch(strInnerHtml){
        case 'board':
          /*TODO: we don't need {url:data/board.xml} passed to the Model instance*/
          modelHome = homeModel.fnc.getInstance({url:'data/board.xml'}); // only one instance allowed, singleton
          this.models.add(modelHome);
          strUrl = 'data/board.xml';
          break;
        default:
          console.group('DEFAULT');
            console.log(':\t', 'Discovered undefined case');
           console.groupEnd(); 
      } // End switch

      var that = this;

      if(strUrl.length > 3){ // only fetch if strUrl has been set in switch block
        this.models.models[0].fetch({ // calls Backbone sync
          url:strUrl,
          dataType:'xml',
          success:function(paramModel){
             that.successHttpResponse(paramModel.get('data')); // model.parse sets the data on the instance 
          },
          error:function(paramThisView, paramException){
            throw new exception.fnc.http({that:paramThisView, exception:paramException}); 
          }
        });
      }

    }, // End getModel
    getHome:function(e){
      console.group('GET Home');
        console.log(':\t', 'Reached');
       console.groupEnd(); 
    }            
  });  

  var interval = w.setInterval(function(){ // we don't need jQuery to wait for DOM
    if(d.getElementsByTagName('div').length > 1){
      w.clearInterval(interval);
      var view = new View(); // TODO: refactor main.js - - > mainController.js then define homeView.js
    }
  }, 33);
  


}); // End require(['jQuery', 'Backbone'] ...




