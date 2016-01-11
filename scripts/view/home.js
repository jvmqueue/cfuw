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
    events:{ // events depends on defining _View.el 
      'click #navBarTop':'listenerNavBar',
      'click #headColRightLogo':'listenerCfuwLogo',
      'click .navbar-header':'listenerNavBarHeader'
    },    
    newWindow:0,
    selectorViewContainer:'#boardMembers',
    idViewContainer:'boardMembers',
    $nodeViewContainer:null, // assigned during render
    selectorViewTitle:'#pageTitle',
    $nodeViewTitle:null,
    intViewTitlePosition:null,
    idViewTitle:'pageTitle',
    selectorViewCfuwBackground:'#pageBackgroundImage',
    $nodeViewCfuwBackground:null,
    cssClassBackgroundOpacity:'jsOpacity',
    cssClassShowBookSale:'jsBookSale',
    cssClassWhiteBackground:'jsCfuwBackgroundColor',
    blnSetBackgroundOpacity:false,
    blnSetBackgroundWhite:false,
    blnSetCfuwCascadingTopBackground:false,
    initialize:function(options){
      var hash = options; 
      this.intViewTitlePosition =  $(this.selectorViewTitle).css('top'); 
      for(var name in hash){ // initilize _View mappings
        this.nav.id.push(hash[name].control);
        this.nav.data.push(hash[name].data);     
        this.nav.modelCid.push(hash[name].modelCid);
        !!hash[name].tagsXml ? this.nav.tagsXml.push(hash[name].tagsXml) : '';          
        !!hash[name].tagsXmlChildsCommon ? this.nav.tagsXmlChildsCommon.push(hash[name].tagsXmlChildsCommon) : '';
        !!hash[name].templateId ? this.nav.templateId.push(hash[name].templateId) : '';
        this.preLoadResources();
      }
      this.setRelativeToDomain();     
    },
    preLoadResources:function(){
      var images = [];
      images[0] = new Image();
      images[0].src = 'images/BookSaleFor2016_2015Nov04.png';
    },
    setRelativeToDomain:function(){
      var strDomain = w.location.toString();
      var blnIsLocal = regEx.fnc.blnIsInString(strDomain, '127.0.0.1');
      var blnIsDev = regEx.fnc.blnIsInString(strDomain, 'CFUW_Dev');
      
      if( (blnIsLocal === true) || (blnIsDev === true)  ){
        var nodeLinkCss = d.getElementById('linkStylesheet');
        nodeLinkCss.setAttribute('href', 'styles/index.css');
      }
    },
    renderDefault:function(paraBlnRenderDefault){
      var $nodeContainer = $('#boardMembers');
      var strJsCssClass = 'jsOpacity';
      
      $nodeContainer.html(''); // reset

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

        if(this.$nodeViewContainer === null){ // assume if $nodeViewContainer not set, then other nodes have not been
          this.$nodeViewContainer = $nodeContainer;
          this.$nodeViewCfuwBackground = $(this.selectorViewCfuwBackground);
          this.$nodeViewTitle = $(this.selectorViewTitle);
        }
        
        $nodeContainer.addClass(this.cssClassWhiteBackground);
        $nodeContainer.removeClass(this.cssClassShowBookSale);
        $('#boardMembers>*').removeClass('hide');
        $('#pageTitle').removeClass('hide');
        $nodeContainer.removeClass('col-xs-12').addClass('col-xs-10');
        this.optimizePageHeight();
        this.setFooterPosition();
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
      this.listenerNavBarHeader();
    },
    setFooterPosition:function(){
      var hashContainerOffset = $(this.selectorViewCfuwBackground).offset();
      // TODO: set footer to bottom of nodeViewContainer
      var intTop = hashContainerOffset.top;
      var intHeight = this.$nodeViewContainer.outerHeight();
      console.group('SET FOOTER POSITION');
        console.log('intTop:\t', intTop);
        console.log('intHeight:\t', intHeight);
        console.log('intTop + intHeight:\t', intTop + intHeight);
       console.groupEnd(); 
      $('#footerMain').css('top', -(intTop + intHeight - 407) + 'px');
    },
    optimizePageHeight:function(){
      var intContainerHeight = this.$nodeViewContainer.prop('offsetHeight');
      var intContainerTop = this.$nodeViewContainer.position().top;
      var intContainerLeft = this.$nodeViewContainer.position().left;
      var $nodeNavBar = $('#navBarTop');
      var intNavBarBottom = $nodeNavBar.position().bottom;
      var $nodePageTitle = $('#pageTitle');

      var intPageTitleBottom = $nodePageTitle.position().bottom;
      if(intContainerHeight < 330){
        var minViewCfuwBackgroundHeight = 360;
        this.$nodeViewCfuwBackground.css('height', minViewCfuwBackgroundHeight + 'px');
        this.$nodeViewContainer.css('top', -minViewCfuwBackgroundHeight + 10 + 'px');
      }else{
        this.$nodeViewCfuwBackground.css('height', intContainerHeight + 'px');
        this.$nodeViewContainer.css('top', -intContainerHeight + 10 + 'px');
      }
    },
    listenerNavBarHeader:function(e){ // TODO: if nav bar is expanded, reposition title node
      var that = this; // scoping
      var nodeNavBarTop = d.getElementById('navBarTop');
      var nodeBoardContainer = $('#boardMembers');
      var intBoardContainerTop = nodeBoardContainer.position().top;
      

      that.$nodeViewTitle === null ? that.$nodeViewTitle = $(this.selectorViewTitle) : '';
      that.$nodeViewTitle.addClass('transitionOut');
      that.$nodeViewTitle.removeClass('transitionIn jsContainerPageTitleNavIsExpanded jsContainerPageTitleNavIsByThreeItems jsContainerPageTitleNavIsExpandedByFiveItems'); // reset
      
      w.setTimeout(function(){
        var intNavBarHeight = nodeNavBarTop.offsetHeight;

        if(intNavBarHeight > 370){ // nav bar expanded state     
          that.$nodeViewTitle.addClass('jsContainerPageTitleNavIsExpandedByFiveItems');
        }else if(intNavBarHeight > 300){
          that.$nodeViewTitle.addClass('jsContainerPageTitleNavIsByThreeItems');
        }else if(intNavBarHeight > 200){
          that.$nodeViewTitle.addClass('jsContainerPageTitleNavIsExpanded');
        }else{
          that.$nodeViewTitle.removeClass('jsContainerPageTitleNavIsExpanded');
        }
         that.$nodeViewTitle.removeClass('transitionOut').addClass('transitionIn');
       }, 333); // End w.setTimeout       
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
      var intIndexNumber = null;
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
      var hashHrefToSet = null;
      var dateNoCache = new Date().getMilliseconds();

      strDataPath = thisNav.data[intDataIndexNumber] + '?noCache=' + dateNoCache;
      arryTagsXml = thisNav.tagsXml[intDataIndexNumber];
      arryTagsCommon = thisNav.tagsXmlChildsCommon[intDataIndexNumber];          
      arryTemplateId = thisNav.templateId[intDataIndexNumber];          

      switch(strId){ // discover which node user clicked
        case 'btnAffiliations':
          model = affiliationsModel.fnc.getInstance(); 
          intIndexNumber = 0;         
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;
        case 'btnBoardMembers':
          model = boardModel.fnc.getInstance(); 
          intIndexNumber = 1;
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;        
        case 'btnContactUs':
          intIndexNumber = 2;
          model = contactUsModel.fnc.getInstance();
          this.blnSetBackgroundWhite = true;
          break;
        case 'btnEvents': 
          /* Client requested events be merged with meetings 2015 Dec 13 */
          break;    
        case 'btnHome':
          intIndexNumber = 4;
          model = homeModel.fnc.getInstance();
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;   
        case 'btnInterestGroups': 
          model = interestGroupsModel.fnc.getInstance(); 
          intIndexNumber = 5;
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;       
        case 'btnMeetings': 
          model = meetingsModel.fnc.getInstance();  
          intIndexNumber = 6;
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;     
        case 'btnMembershipApplication': 
          model = membershipApplicationModel.fnc.getInstance(); 
          intIndexNumber = 7;
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;                                                                         
        case 'btnMissionStatement':
          model = missionStatementModel.fnc.getInstance(); 
          intIndexNumber = 8;
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;
          break;
        case 'btnNews':
          model = newsModel.fnc.getInstance();
          intIndexNumber = 9; 
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;                  
        case 'btnScholarships': 
          model = scholarshipsModel.fnc.getInstance(); 
          intIndexNumber = 10;
          this.blnSetBackgroundOpacity = true;
          this.blnSetBackgroundWhite = true;            
          this.blnAddPaddingTopSmallest = true;
          break;             
        case 'btnBookSale': 
          blnShowDefault = true;          
          $(this.selectorViewCfuwBackground).removeClass(strJsCssClass);
          this.render(); // no parameters renders default
          return void(0);
          break;                                                                          
        default:
          this.listenerNavBarHeader();
          return void(0); /* do nothing we are not listening to the node */
      } // End switch
      // assigned model in above switch, now set the properties

      // access our configMapping.js JSON relative to index number.
      strCid = thisNav.modelCid[intIndexNumber]; 
      model.set('templateId', arryTemplateId); // templateId is defined in configMapping.js
      model.set('tagsXml', arryTagsXml); // allow the associated model to access XML data via the top XML tag names
      model.set('tagsXmlChildsCommon', arryTagsCommon); // allow the associated model to accesss XML data via child tag names
      hashCssClassToSet = model.get('hashCssClassToSet'); // data to merge with template. set in model
      hashHrefToSet = model.get('hashHrefToSet'); 
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




