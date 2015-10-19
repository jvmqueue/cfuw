define(['jQuery', 'Backbone', 'homeModel', 'boardModel', 'missionStatementModel', 'util', 'basePath', 'exception'], 
  function($, Backbone, homeModel, boardModel, missionStatementModel, util, basePath, exception, undefined){

  var w = window, d = document;
  var Collection = Backbone.Collection.extend({});
  var _View = Backbone.View.extend({
    collection:new Collection(),
    el:'div',
    model:null,
    nav:{
        id:[],
        data:[]
    },
    newWindow:0,
    selectorViewContainer:'#boardMembers table',
    selectorViewTitle:'#pageTitle',
    initialize:function(options){
      var hash = options;
      for(var name in hash){ // initilize _View mappings
        this.nav.id.push(hash[name].control);
        this.nav.data.push(hash[name].data);         
      }
    },
    events:{ // events depends on defining _View.el 
      'click #navBarTop':'listenerNavBar',
      'click #headColRightLogo':'listenerCfuwLogo'
    },
    renderDefault:function(){
      var $nodeContainer = $('#colMainCenter');
      $nodeContainer.addClass('jsBookSale');
    },
    render:function(options){

      if('blnShowDefault' in options){
        this.renderDefault();
        return false;
      }

      var json = options.data;
      var strSelectorTemplate = '#'+ options.idTemplate;
      var strSelectorTemplateTitle = '#templatePageTitle';
      var $nodeTemplate = $(strSelectorTemplate);
      var $nodeTemplateTitle = $(strSelectorTemplateTitle);
      var html = $nodeTemplate.html();
      var htmlTitle = $nodeTemplateTitle.html();
      var _template = _.template(html);
      var _templateTitle = _.template(htmlTitle);
      var strHtml = '';

      for(var i = 0, len = json.length; i < len; i++){
        strHtml += _template(json[i]);
      }

      var $nodeExist = $(this.selectorViewContainer);
      var $nodeExistTitle = $(this.selectorViewTitle);
      $nodeExist.html(strHtml);
      strHtml = _templateTitle(json[0]);
      $nodeExistTitle.html(strHtml);
      $('#colMainCenter').removeClass('jsBookSale');
    },
    listenerCfuwLogo:function(e){
      var strUrl = 'http://www.cfuw.org/';
      var windows = {width:827, height:363};
      this.newWindow = window.open(strUrl,'name','height='+windows.height+',width='+windows.width);
      if (window.focus) {this.newWindow.focus()}
      return false;
    },
    listenerNavBar:function(e){
      var nodeTarget = e.target;
      var strId = nodeTarget.getAttribute('id') || nodeTarget.parentNode.getAttribute('for');
      var thisNav = this.nav;
      var model = null;
      var strDataPath = null;
      var strCid = null;
      var strIdTemplate = null;
      var blnShowDefault = false;


      switch(strId){
        case thisNav.id[0]:
          model = homeModel.fnc.getInstance({modelId:'home'});
          strCid = 'homeId';
          strIdTemplate = 'templateHome';
          strDataPath = thisNav.data[0];
          break;
        case thisNav.id[1]:
          model = missionStatementModel.fnc.getInstance({modelId:'missionStatement'});
          strCid = 'missionStatementId';
          strIdTemplate = 'templateMissionStatement';
          strDataPath = thisNav.data[1];
          break;
        case thisNav.id[2]:
          break;
        case thisNav.id[3]:
          model = boardModel.fnc.getInstance({modelId:'boardId'});
          strCid = 'boardId';
          strIdTemplate = 'templateBoardMembers';
          strDataPath = thisNav.data[3];
          break;
        case thisNav.id[4]:
          
          break;
        case thisNav.id[5]:

          break;          
        default:
          blnShowDefault = true;          
      } // End switch
      this.collection.add(model);
      var that = this;

      if(blnShowDefault === false){
        model.fetch({
          url:basePath.basePath() + strDataPath,
          dataType:'xml',
          success:function(){
            var modelSuccess = that.collection.where({'cid':strCid})[0];
            var json = modelSuccess.get('arryTemplateData'); // data to merge with template
            that.render({idTemplate:strIdTemplate, data:json});
          },
          error:function(paramThisView, paramException){
            throw new exception.fnc.http({that:paramThisView, exception:paramException, cfuwException:'Fetch in home View Failed'}); 
          }        
        });        
      }else{
        that.render({blnShowDefault:blnShowDefault});
      }
    } // End listenerNavBar 
  });

  return{View:_View}

  


}); // End require(['jQuery', 'Backbone'] ...




