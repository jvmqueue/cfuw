define(['jQuery', 
  'Backbone', 
  'homeModel', 
  'boardModel', 
  'missionStatementModel', 
  'contactUsModel', 
  'affiliationsModel', 
  'membershipApplicationModel', 
  'newsModel', 
  'meetingsModel',
  'eventsModel',  
  'interestGroupsModel',  
  'scholarshipsModel',  
  'util', 
  'regEx', 
  'basePath', 
  'exception'], 
  function($, 
    Backbone, 
    homeModel, 
    boardModel, 
    missionStatementModel, 
    contactUsModel, 
    affiliationsModel, 
    membershipApplicationModel,
    newsModel,
    meetingsModel,
    eventsModel,
    interestGroupsModel,
    scholarshipsModel,
    util, 
    regEx, 
    basePath, 
    exception, 
    undefined){

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
    blnSetCfuwCascadingTopBackground:false,
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
        $nodeContainer.removeClass('jsContainerPageText').removeClass('jsCfuwTopImageFade');
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
      
      
      var strModelId = options.idModel;
      var hashCssClassToSet = this.collection.where({'cid':strModelId})[0].get('hashCssClassToSet') || '';
      var json = this.collection.where({'cid':strModelId})[0].get('arryTemplateData');
      
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
        $nodeExist.addClass('jsContainerPageText').addClass('jsCfuwTopImageFade');
      }else{
        $nodeExist.removeClass('jsCfuwBackgroundColor');
      }
      if(blnAddPadding === true){ // assume white background has text
        $nodeExist.addClass('jsPaddingTopSmallest');
      }else{
        $nodeExist.removeClass('jsPaddingTopSmallest');
      }      

      $( "p:contains('CONVENORS')" ).addClass('jsIsSubHeading row').removeClass('col-xs-5'); // TODO: this is a hack, fix it properly
    },
    listenerCfuwLogo:function(e){
      var strUrl = 'http://www.cfuw.org/';
      var windows = {width:827, height:363};
      this.newWindow = window.open(strUrl,'name','height='+windows.height+',width='+windows.width);
      if (window.focus) {this.newWindow.focus()}
      return false;
    },
    listenerNavBar:function(e){ // listening to the nav bar, using event delegation
      var nodeTarget = e.target;
      // HTML5 let HTML element define index for accessing associated data
      var intDataIndexNumber = parseInt(nodeTarget.dataset.indexNumber);
      var strId = nodeTarget.getAttribute('id') || nodeTarget.parentNode.getAttribute('for');
      strId = regEx.fnc.strRemoveWhiteSpace(strId);
      var thisNav = this.nav; //  view mappings set in this.initialize, configMappings.js controls this data
      var model = this.model; // reference variable, pointer
      var strDataPath = null;
      var arryTagsXml = null;
      var arryTagsCommon = null;
      var arryTemplateId = null;
      var strCid = null;
      var strIdTemplate = null;
      var blnShowDefault = false;
      var strJsCssClass = 'jsOpacity';
      var blnSetBackgroundOpacity = false;
      var $nodeExist = $(this.selectorViewContainer);
      var strSwitchCase = thisNav.id[intDataIndexNumber];
      var hashCssClassToSet = null;
      var dateNoCache = new Date().getMilliseconds();

      if(typeof strSwitchCase == 'undefined'){ // can always call render with no args to render default view
        this.render();
        return void(0);
      }
      
      $nodeExist.removeClass('jsContainerPageText'); // reset
      $nodeExist.removeClass('jsContainerPageText').removeClass('jsCfuwTopImageFade'); // reset
      // access our configMapping.js JSON relative to data-index-number html attribute. HTML5 construct
      strCid = thisNav.modelCid[intDataIndexNumber];
      strDataPath = thisNav.data[intDataIndexNumber] + '?noCache=' + dateNoCache;
      arryTagsXml = thisNav.tagsXml[intDataIndexNumber];
      arryTagsCommon = thisNav.tagsXmlChildsCommon[intDataIndexNumber];          
      arryTemplateId = thisNav.templateId[intDataIndexNumber];          

      switch(strId){ // discover which node user clicked
        case thisNav.id[0]:
          model = homeModel.fnc.getInstance();
          this.blnSetBackgroundOpacity = true; 
          this.blnAddPaddingTopSmallest = false;
          this.blnSetBackgroundWhite = false;
          break;
        case thisNav.id[1]:
          model = missionStatementModel.fnc.getInstance();
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;
          break;
        case thisNav.id[2]:
          model = contactUsModel.fnc.getInstance();
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          this.blnSetBackgroundWhite = true;
          break;
        case thisNav.id[3]:
          model = boardModel.fnc.getInstance(); 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;
        case thisNav.id[4]:
          model = affiliationsModel.fnc.getInstance(); 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;
        case thisNav.id[5]: 
          model = membershipApplicationModel.fnc.getInstance(); 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;
        case thisNav.id[6]:
          model = newsModel.fnc.getInstance(); 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;           
        case thisNav.id[7]: 
          model = meetingsModel.fnc.getInstance(); 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;               
        case thisNav.id[8]: 
          /* Client requested events be merged with meetings 2015 Dec 13 */
          break;             
        case thisNav.id[9]: 
          model = interestGroupsModel.fnc.getInstance(); 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;                     
        case thisNav.id[10]: 
          model = scholarshipsModel.fnc.getInstance(); 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;                                                                    
        default:
          blnShowDefault = true;          
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
      } // End switch
      // assigned model in above switch, now set the properties

      model.set('templateId', arryTemplateId); // templateId is defined in configMapping.js
      model.set('tagsXml', arryTagsXml); // allow the associated model to access XML data via the top XML tag names
      model.set('tagsXmlChildsCommon', arryTagsCommon); // allow the associated model to accesss XML data via child tag names
      hashCssClassToSet = model.get('hashCssClassToSet'); // data to merge with template. set in model
      strIdTemplate = model.get('templateId');
      
      var that = this;

      if( ( model.get('blnDataHasBeenSet') === true ) ){ // do not perform HTTP Request, data has been set on model
            that.render({idModel:strCid, idTemplate:strIdTemplate});
            return void(0);
      }

      if(blnShowDefault === false && ( model.get('blnDataHasBeenSet') === false ) ){ // no need to request if data is set on model
        this.collection.add(model);
        model.fetch({
          url:basePath.basePath() + strDataPath,
          dataType:'xml',
          success:function(){            
            that.render({idModel:strCid, idTemplate:strIdTemplate});
            model.set('hashCssClassToSet', hashCssClassToSet);
            model.set('blnDataHasBeenSet', true);  // optimization: flag indicates data set, don't need to perform HTTP Request
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




