define(['jQuery', 'Backbone', 'homeModel', 'homeView', 'missionStatementModel', 'util', 'exception'], 
  function($, Backbone, homeModel, homeView, missionStatementModel, util, exception, undefined){

  var w = window, d = document;
  var modelHome = null;


      var template = {
        populateContent:function(paramSelectorContainerToShow){
            $(paramSelectorContainerToShow).removeClass('hide');
        },
        showImage:function(paramCssJsClass, paramSelectorContainerToAppend, paramBlnHide){
            var $node = null;
            if(paramBlnHide === false){
                $node = $(paramSelectorContainerToAppend).addClass(paramCssJsClass);
                $('.tableFontMedium').addClass('hide');
                $node.removeClass('hide');
                $('.' + paramCssJsClass + ' h3').addClass('hide');
            }else{
                $node = $(paramSelectorContainerToAppend).removeClass(paramCssJsClass);
                $('.tableFontMedium').removeClass('hide');
                $node.removeClass('hide').addClass('cfuwWhite');
                $('.colMainCenter h3').removeClass('hide');
            }

        }
    };

  var Models = Backbone.Collection.extend({

  });

  var _View = Backbone.View.extend({
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
      /*This View is event driven by the visitor. We only need to register the events in events attribute above*/
    },
    render:function(){
      
    },
    setTemplate:function(options){
      var that = this; /*TODO: use interfaces so that we avoid having to scope*/
      var interval = w.setInterval(function(){

        var model = that.models.where({cid:options.cid});
        var strPageTitle = model[0].get('pageTitle');
        var arry = model[0].get('arryTemplateData');

        if( !!that.models.models[0].get('arryTemplateData') ){ /*TOOD: replace this interval with a listener*/
          w.clearInterval(interval);

          var template = d.getElementById(options.idTemplate);
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
    getModel:function(e){ // event delegate for navigation is registered during instantiation ie events attribute above
      var node = e.target;
      var strInnerHtml = node.firstChild.nodeValue.toLowerCase();
      var strUrl = '';
      var $nodeExist = $(this.selectorViewContainer);
      var $nodePageTitle = $(this.selectorViewPageTitle);

      var nodeParent = e.target.parentNode;
      var strIdParent = nodeParent.getAttribute('id');
      var model = null;
      var modelBoard = null;
      var modelMissionStatement = null;
      var strCid = null;

      switch(strInnerHtml){
        case 'home':
            template.showImage('jsBookSale', '#colMainCenter', false);
            $('#sectionCfuwBackground').removeClass('jsOpacity');
            break;
        case 'about us':
            // Do Nothing
            break;            
        case 'book sale':
            template.showImage('jsBookSale', '#colMainCenter', false);
            $('#sectionCfuwBackground').addClass('jsOpacity');
            break;                
        case 'mission statement':
            template.showImage('jsBookSale', '#colMainCenter', true);
            $('#sectionCfuwBackground').addClass('jsOpacity');
            modelMissionStatement = missionStatementModel.fnc.getInstance(); // only one instance allowed, singleton
            this.models.add(modelMissionStatement);
            
            model = this.models.where({cid:'missionStatementId'});
             
            strUrl = model[0].get('url') + '?noCache=' + util.fnc.noCache();
            strCid = 'missionStatementId';
            this.setTemplate({idTemplate:'templateMissionStatement', cid:strCid});            
            break;                                                    
        case 'board':
            template.showImage('jsBookSale', '#colMainCenter', true);
            $('#sectionCfuwBackground').addClass('jsOpacity');

            modelBoard = homeModel.fnc.getInstance(); // only one instance allowed, singleton
            this.models.add(modelBoard);
            strCid = 'boardMembersId';
            model = this.models.where({cid:strCid});
            strUrl = model[0].get('url') + '?noCache=' + util.fnc.noCache();                       
            this.setTemplate({idTemplate:'templateBoardMembers', cid:'boardMembersId'});            
          break;
        default:
            template.showImage('jsBookSale', '#colMainCenter', false);
            $('#sectionCfuwBackground').removeClass('jsOpacity');        

      } // End switch

      var that = this;

      if(strUrl.length > 3){ // only fetch if strUrl has been set in switch block
        this.models.models[0].fetch({ // calls Backbone sync
          url:strUrl,
          dataType:'xml',
          success:function(paramModel){
            strUrl = paramModel.get('url') + '?noCache=' + util.fnc.noCache();                                   
            model[0].successHttpResponse(paramModel.get('data'));
          },
          error:function(paramThisView, paramException){
            throw new exception.fnc.http({that:paramThisView, exception:paramException, cfuwException:'Fetch in home View Failed'}); 
          }
        });
      }

    }, // End getModel
    getHome:function(e){

    }            
  });  

  return{View:_View}
  


}); // End require(['jQuery', 'Backbone'] ...




