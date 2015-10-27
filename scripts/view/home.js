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
    selectorViewContainer:'#boardMembers',
    idViewContainer:'boardMembers',
    selectorViewTitle:'#pageTitle',
    selectorViewCfuwBackground:'#pageBackgroundImage',
    cssClassBackgroundOpacity:'jsOpacity',
    cssClassShowBookSale:'jsBookSale',
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
      $nodeContainer.addClass(this.cssClassShowBookSale);
    },
    render:function(options){

      if('blnShowDefault' in options){
        this.renderDefault();
        return false;
      }

      var json = options.data;
      var strSelectorTemplate = '#'+ options.idTemplate;
      var strModelId = options.idModel;
      var model = this.collection.where({'cid':strModelId})[0];
      var blnSetBackgroundOpacity = model.get('blnSetBackgroundOpacity');      
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
      $('#colMainCenter').removeClass(this.cssClassShowBookSale);

      
      d.getElementById('pageTitle').scrollIntoView();

      if(blnSetBackgroundOpacity === true){
        $(this.selectorViewCfuwBackground).addClass(this.cssClassBackgroundOpacity);
      }else{
        $(this.selectorViewCfuwBackground).removeClass(this.cssClassBackgroundOpacity);
      }


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
      var strJsCssClass = 'jsOpacity';
      var blnSetBackgroundOpacity = false;

      switch(strId){
        case thisNav.id[0]:
          strCid = 'homeId';
          strDataPath = thisNav.data[0];
          model = homeModel.fnc.getInstance({modelCid:strCid});
          model.set('templateId', 'templateHome');
          model.set('blnSetBackgroundOpacity', false); 
          break;
        case thisNav.id[1]:
          strCid = 'missionStatementId';
          strDataPath = thisNav.data[1];
          model = missionStatementModel.fnc.getInstance({modelCid:strCid});
          model.set('templateId', 'templateMissionStatement');
          model.set('blnSetBackgroundOpacity', true);          
          break;
        case thisNav.id[2]:
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          break;
        case thisNav.id[3]:
          model = boardModel.fnc.getInstance({modelId:'boardId'});
          strCid = 'boardId';
          strIdTemplate = 'templateBoardMembers';
          strDataPath = thisNav.data[3];
          $(this.selectorViewCfuwBackground).addClass(strJsCssClass);
          break;
        case thisNav.id[4]:
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          break;
        case thisNav.id[5]:
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          break;          
        default:
          blnShowDefault = true;          
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
      } // End switch
      this.collection.add(model);
      var that = this;

      if(blnShowDefault === false){
        model.fetch({
          url:basePath.basePath() + strDataPath,
          dataType:'xml',
          success:function(){
            var modelSuccess = that.collection.where({'cid':strCid})[0];
            var strIdTemplate = modelSuccess.get('templateId');
            var json = modelSuccess.get('arryTemplateData'); // data to merge with template
            that.render({idModel:strCid, idTemplate:strIdTemplate, data:json});
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




