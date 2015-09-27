require(['jQuery', 'Backbone', 'homeModel', 'homeView', 'util', 'exception'], 
  function($, Backbone, homeModel, homeView, util, exception, undefined){

  var w = window, d = document;
  var modelHome = null;

  var Models = Backbone.Collection.extend({

  });

  var View = Backbone.View.extend({
    tagName:'div',
    el:'div',
    selectorViewContainer:'#boardMembers table',
    selectorViewPageTitle:'#pageTitle',
    events:{ // must define View.el which is to #navBarTop
      'click #navBarTop':'getModel',
      'click #headColRightLogo':'getHome'
    },
    models:new Models(),
    initialize:function(){
      this.render();
    },
    render:function(){
      
    },
    setTemplate:function(){
      var that = this; /*TODO: use interfaces so that we avoid having to scope*/
      var interval = w.setInterval(function(){

        if( !!that.models.models[0].get('arryTemplateData') ){ /*TOOD: replace this interval with a listener*/
          w.clearInterval(interval);
          var arry = that.models.models[0].get('arryTemplateData');
          var strPageTitle = that.models.models[0].get('pageTitle');
          var template = d.getElementById('templateBoardMembers');
          var strTemplateHtml = $(template).html(); // our custom template, not the entire response text      

          var _template = _.template(strTemplateHtml);
          var strHtml = '';
          
          for(var i = 0, len = arry.length; i < len; i++){
            strHtml += _template(arry[i]);
          }

          var $nodeExist = $(that.selectorViewContainer);
          var $nodeTitle = $(that.selectorViewPageTitle);
          $nodeExist.html(strHtml);
          $nodeTitle.html(strPageTitle);


          
        }
      }, 333);
    },
    getModel:function(e){ // event delegate for navigation
      var node = e.target;
      var strInnerHtml = node.firstChild.nodeValue.toLowerCase();
      var strUrl = '';

      var $nodeExist = $(this.selectorViewContainer);
      var $nodePageTitle = $(this.selectorViewPageTitle);
      $nodeExist.html('');
      $nodePageTitle.html('');

      switch(strInnerHtml){
        case 'board':
          /*TODO: we don't need {url:data/board.xml} passed to the Model instance*/
          modelHome = homeModel.fnc.getInstance(); // only one instance allowed, singleton
          this.models.add(modelHome);
          strUrl = this.models.models[0].get('url');
          this.setTemplate();
          break;
        default:

      } // End switch

      var that = this;

      if(strUrl.length > 3){ // only fetch if strUrl has been set in switch block
        this.models.models[0].fetch({ // calls Backbone sync
          url:strUrl,
          dataType:'xml',
          success:function(paramModel){
             that.models.models[0].successHttpResponse(paramModel.get('data'));
          },
          error:function(paramThisView, paramException){
            throw new exception.fnc.http({that:paramThisView, exception:paramException}); 
          }
        });
      }

    }, // End getModel
    getHome:function(e){

    }            
  });  

  var interval = w.setInterval(function(){ // we don't need jQuery to wait for DOM
    if(d.getElementsByTagName('div').length > 1){
      w.clearInterval(interval);
      var view = new View(); // TODO: refactor main.js - - > mainController.js then define homeView.js
    }
  }, 33);
  


}); // End require(['jQuery', 'Backbone'] ...




