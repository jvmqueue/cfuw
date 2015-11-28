define(['jQuery', 'Backbone', 'homeModel', 'boardModel', 'missionStatementModel', 'contactUsModel', 'util', 'regEx', 'basePath', 'exception'], 
  function($, Backbone, homeModel, boardModel, missionStatementModel, contactUsModel, util, regEx, basePath, exception, undefined){

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
        modelCid:[],
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
        this.nav.modelCid.push(hash[name].modelCid);     
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
      var strJsCssClass = 'jsOpacity';
      if(paraBlnRenderDefault === true){  // show book sale image
        $nodeContainer.removeClass(this.cssClassWhiteBackground);
        $nodeContainer.addClass(this.cssClassShowBookSale);
        $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
        $('#boardMembers>*').addClass('hide');
        $('#pageTitle').addClass('hide');
        $nodeContainer.removeClass('col-xs-10').addClass('col-xs-12');
      }

    },
    render:function(options){
      
      if(!options){ // node clicked that we are not monitoring
        this.renderDefault(true); // true for render book sale
        return void(0);
      }else{ // TODO: this is hack to fix a bug, this block was causing underscore to throw exceptions
        var $nodeContainer = $(this.selectorViewContainer);
        $nodeContainer.addClass(this.cssClassWhiteBackground);
        $nodeContainer.removeClass(this.cssClassShowBookSale);
        $('#boardMembers>*').removeClass('hide');
        $('#pageTitle').removeClass('hide');
        $nodeContainer.removeClass('col-xs-12').addClass('col-xs-10');        
      }
      var hashCssClassToSet = options.hashCssClassToSet || '';
      
      var strModelId = options.idModel;
      var json = this.collection.where({'cid':strModelId})[0].get('arryTemplateData');
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

      
      d.getElementById('navBarTop').scrollIntoView();

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
      var intDataIndexNumber = parseInt(nodeTarget.dataset.indexNumber);
      var strId = nodeTarget.getAttribute('id') || nodeTarget.parentNode.getAttribute('for');
      strId = regEx.fnc.strRemoveWhiteSpace(strId);
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
      var strSwitchCase = thisNav.id[intDataIndexNumber];

      if(typeof strSwitchCase == 'undefined'){ 
        this.render(); // can always call render with no args to render default view
        return void(0);
      }
      
      $nodeExist.removeClass('jsContainerPageText'); // reset
      // access our configMapping.js JSON relative to data-index-number html attribute. HTML5 construct
      strCid = thisNav.modelCid[intDataIndexNumber];
      strDataPath = thisNav.data[intDataIndexNumber];
      arryTagsXml = thisNav.tagsXml[intDataIndexNumber];
      arryTagsCommon = thisNav.tagsXmlChildsCommon[intDataIndexNumber];          
      arryTemplateId = thisNav.templateId[intDataIndexNumber];          


      switch(strId){
        case thisNav.id[0]:
          model = homeModel.fnc.getInstance({modelCid:strCid});
          this.blnSetBackgroundOpacity = true; 
          this.blnAddPaddingTopSmallest = false;
          this.blnSetBackgroundWhite = false;
          break;
        case thisNav.id[1]:
          model = missionStatementModel.fnc.getInstance({modelCid:strCid});
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;
          break;
        case thisNav.id[2]:
         model = contactUsModel.fnc.getInstance({modelCid:strCid});
          blnShowDefault = true;
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          break;
        case thisNav.id[3]:
          model = boardModel.fnc.getInstance({modelId:strCid}); 
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
      // assigned model in above switch, now set the properties
      model.set('templateId', arryTemplateId); // templateId is defined in configMapping.js
      model.set('tagsXml', arryTagsXml);
      model.set('tagsXmlChildsCommon', arryTagsCommon); 
      
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




