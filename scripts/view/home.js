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
        data:[],
        tagsXml:[],
        tagsXmlChildsCommon:[],
        templateId:[]
    },
    newWindow:0,
    selectorViewContainer:'#boardMembers',
    idViewContainer:'boardMembers',
    selectorViewTitle:'#pageTitle',
    idViewTitle:'pageTitle',
    selectorViewCfuwBackground:'#pageBackgroundImage',
    cssClassBackgroundOpacity:'jsOpacity',
    cssClassShowBookSale:'jsBookSale',
    cssClassWhiteBackground:'jsCfuwBackgroundColor',
    blnSetBackgroundOpacity:false,
    blnSetBackgroundWhite:false,
    initialize:function(options){
      var hash = options; 
      for(var name in hash){ // initilize _View mappings
        this.nav.id.push(hash[name].control);
        this.nav.data.push(hash[name].data);     
        !!hash[name].tagsXml ? this.nav.tagsXml.push(hash[name].tagsXml) : '';          
        !!hash[name].tagsXmlChildsCommon ? this.nav.tagsXmlChildsCommon.push(hash[name].tagsXmlChildsCommon) : '';
        !!hash[name].templateId ? this.nav.templateId.push(hash[name].templateId) : '';
      }     
    },
    events:{ // events depends on defining _View.el 
      'click #navBarTop':'listenerNavBar',
      'click #headColRightLogo':'listenerCfuwLogo'
    },
    renderDefault:function(paraBlnRenderDefault){
      var $nodeContainer = $('#boardMembers');
      if(paraBlnRenderDefault === true){  // show book sale image
        $nodeContainer.removeClass(this.cssClassWhiteBackground);
        $nodeContainer.addClass(this.cssClassShowBookSale);
        $('#boardMembers>*').addClass('hide');
        $('#pageTitle').addClass('hide');
        $nodeContainer.removeClass('col-xs-10').addClass('col-xs-12');
      }

    },
    render:function(options){
      
      var hashCssClassToSet = options.hashCssClassToSet || '';

      if(!options.data){
        this.renderDefault(!options.data);
        return void(0);
      }else{ // TODO: this is hack to fix a bug, this block was causing underscore to throw exceptions
        var $nodeContainer = $(this.selectorViewContainer);
        $nodeContainer.addClass(this.cssClassWhiteBackground);
        $nodeContainer.removeClass(this.cssClassShowBookSale);
        $('#boardMembers>*').removeClass('hide');
        $('#pageTitle').removeClass('hide');
        $nodeContainer.removeClass('col-xs-12').addClass('col-xs-10');        
      }

      var json = options.data;
      var strModelId = options.idModel;
      var arryTagsXml = options.tagsXml;
      var blnSetBackgroundOpacity = this.blnSetBackgroundOpacity;
      var blnSetBackgroundWhite = this.blnSetBackgroundWhite;
      var blnAddPadding = this.blnAddPaddingTopSmallest;

      var strSelectorTemplateTitle = '#templatePageTitle';
      var strSelectorTemplate = '#'+ options.idTemplate;
      var $nodeTemplate = $(strSelectorTemplate);
     
      var html = $nodeTemplate.html();
      var $nodeTemplateTitle = $(strSelectorTemplateTitle);
      
      var htmlTitle = $nodeTemplateTitle.html();
      var _template = _.template(html);
      var _templateTitle = _.template(htmlTitle);
      var strHtml = ''; 

 

      if(!!json){ // TODO: this should be a method call, removing if structure block contents

        for(var i = 0, len = json.length; i < len; i++){      
          strHtml += _template(json[i]);           
        }


        var $nodeExist = $(this.selectorViewContainer);
        var $nodeExistTitle = $(this.selectorViewTitle);
        $nodeExist.html(strHtml);
        strHtml = _templateTitle(json[0]);
        $nodeExistTitle.html(strHtml);
        $('#colMainCenter').removeClass(this.cssClassShowBookSale);        
      }

      
      d.getElementById('boardMembers').scrollIntoView();

      if(blnSetBackgroundOpacity === true){
        $(this.selectorViewCfuwBackground).addClass(this.cssClassBackgroundOpacity);
      }else{
        $(this.selectorViewCfuwBackground).removeClass(this.cssClassBackgroundOpacity);
      }
      if(blnSetBackgroundWhite === true){ // assume white background has text
        $nodeExist.addClass('jsCfuwBackgroundColor');
      }else{
        $nodeExist.removeClass('jsCfuwBackgroundColor');
      }
      if(blnAddPadding === true){ // assume white background has text
        $nodeExist.addClass('jsPaddingTopSmallest');
      }else{
        $nodeExist.removeClass('jsPaddingTopSmallest');
      }      

      $nodeExist.addClass('jsContainerPageText');

      $( "p:contains('CONVENORS')" ).addClass('jsIsSubHeading row').removeClass('col-xs-5'); // TODO: this is a hack, fix it properly
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
      var thisNav = this.nav; //  view mappings set in this.initialize, configMappings.js controls this data
      var model = null;
      var strDataPath = null;
      var arryTagsXml = null;
      var arryTagsCommon = null;
      var arryTagsCommon = null;
      var arryTemplateId = null;
      var strCid = null;
      var strIdTemplate = null;
      var blnShowDefault = false;
      var strJsCssClass = 'jsOpacity';
      var blnSetBackgroundOpacity = false;
      var $nodeExist = $(this.selectorViewContainer);
      
      $nodeExist.removeClass('jsContainerPageText'); // reset

      switch(strId){
        case thisNav.id[0]:
          strCid = 'homeId';
          strDataPath = thisNav.data[0];
          arryTagsXml = thisNav.tagsXml[0];
          arryTagsCommon = thisNav.tagsXmlChildsCommon[0];
          arryTemplateId = thisNav.templateId[0];
          model = homeModel.fnc.getInstance({modelCid:strCid});
          model.set('templateId', arryTemplateId); // templateId is defined in configMapping.js
          this.blnSetBackgroundOpacity = true; 
          this.blnAddPaddingTopSmallest = false;
          this.blnSetBackgroundWhite = false;
          break;
        case thisNav.id[1]:
          strCid = 'missionStatementId';
          strDataPath = thisNav.data[1];
          arryTagsXml = thisNav.tagsXml[1];
          arryTagsCommon = thisNav.tagsXmlChildsCommon[1];          
          arryTemplateId = thisNav.templateId[1];          
          model = missionStatementModel.fnc.getInstance({modelCid:strCid});
          model.set('templateId', arryTemplateId); // templateId is defined in configMapping.js
          model.set('tagsXml', arryTagsXml);
          model.set('tagsXmlChildsCommon', arryTagsCommon);
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;
          break;
        case thisNav.id[2]:
          blnShowDefault = true;
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          break;
        case thisNav.id[3]:
          strCid = 'boardId';
          strDataPath = thisNav.data[3];  // data from configMapping.js        
          arryTagsXml = thisNav.tagsXml[3];  // data from configMapping.js
          arryTagsCommon = thisNav.tagsXmlChildsCommon[3];  // data from configMapping.js
          arryTemplateId = thisNav.templateId[3];  // data from configMapping.js
          model = boardModel.fnc.getInstance({modelId:strCid});
          model.set('templateId', arryTemplateId); // templateId is defined in configMapping.js
          model.set('tagsXml', arryTagsXml);
          model.set('tagsXmlChildsCommon', arryTagsCommon);
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;
        case thisNav.id[4]:
          blnShowDefault = true;
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          break;
        case thisNav.id[5]:
          blnShowDefault = true;
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          break;          
        default:
          blnShowDefault = true;          
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
      } // End switch

      
      var that = this;

      if(blnShowDefault === false){
        this.collection.add(model);
        model.fetch({
          url:basePath.basePath() + strDataPath,
          dataType:'xml',
          success:function(){
            var modelSuccess = that.collection.where({'cid':strCid})[0];
            var strIdTemplate = modelSuccess.get('templateId');
            var json = modelSuccess.get('arryTemplateData'); // data to merge with template
            var hashCssClassToSet = modelSuccess.get('hashCssClassToSet'); // data to merge with template
            var tagsXml = arryTagsXml;
            that.render({idModel:strCid, 
              idTemplate:strIdTemplate, 
              data:json, 
              tagsXml:tagsXml,
              hashCssClassToSet:hashCssClassToSet});
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




