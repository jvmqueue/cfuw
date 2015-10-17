define(['jQuery', 'Backbone', 'homeModel', 'homeView', 'missionStatementModel', 'util', 'exception'], 
  function($, Backbone, homeModel, homeView, missionStatementModel, util, exception, undefined){

  var w = window, d = document;
  var Collection = Backbone.Collection.extend({});
  var _View = Backbone.View.extend({
    el:'div',
    selectorViewContainer:'#boardMembers table',
    model:null,
    collection:new Collection(),
    initialize:function(){
    },
    NAV:{ID:{
      HOME:'btnHome',
      MISSION_STATEMENT:'btnMissionStatement',
      CONTACT_US:'btnContactUs',
      BOARD:'btnBoadMembers',
      AFFILIATIONS:'btnAffiliations',
      MEMBERSHIP_APPLICATION:'btnMembershipApplication'
    }},
    events:{ // events depends on defining _View.el 
      'click #navBarTop':'listenerNavBar'
    },
    render:function(options){
      var json = options.data;
      var strSelectorTemplate = '#'+ options.idTemplate;
      var $nodeTemplate = $(strSelectorTemplate);
      var html = $nodeTemplate.html();
      var _template = _.template(html);
      var strHtml = '';

      for(var i = 0, len = json.length; i < len; i++){
        strHtml += _template(json[i]);
      }

      var $nodeExist = $(this.selectorViewContainer);
      $nodeExist.html(strHtml);
      $('#colMainCenter').removeClass('jsBookSale');


      console.group('RENDER');
        console.log('$nodeTemplate:\t', $nodeTemplate);
        console.log('$nodeExist:\t', $nodeExist);
        console.log('html:\t', html);
        console.log('options.data:\t', options.data);
       console.groupEnd(); 
    },
    listenerNavBar:function(e){
      var nodeTarget = e.target;
      var strId = nodeTarget.getAttribute('id') || nodeTarget.parentNode.getAttribute('for');
      var thisNavId = this.NAV.ID;
      var model = null;
      var strDataPath = null;
      var strCid = null;
      var strIdTemplate = null;

      switch(strId){
        case thisNavId.HOME:
          model = homeModel.fnc.getInstance({modelId:'home'});
          strCid = 'homeId';
          strIdTemplate = 'templateHome';
          strDataPath = 'data/home.xml';
          this.collection.add(model);
          break;
        case thisNavId.MISSION_STATEMENT:
          // get model instance
          model = missionStatementModel.fnc.getInstance({modelId:'missionStatement'});
          strCid = 'missionStatementId';
          strIdTemplate = 'templateMissionStatement';
          strDataPath = 'data/missionStatement.xml';
          // add to collection
          this.collection.add(model);
          // now get data through the model
          break;
        case thisNavId.CONTACT_US:
          
          break;
        case thisNavId.BOARD:
          
          break;
        case thisNavId.AFFILIATIONS:
          
          break;
        case thisNavId.MEMBERSHIP_APPLICATION:

          break;          
        default:
          model = homeModel.fnc.getInstance({modelId:'home'});
          strDataPath = 'data/home.xml';
          this.collection.add(model);
      } // End switch
      var that = this;
      model.fetch({
        url:strDataPath,
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
    } // End listenerNavBar 
  });

  return{View:_View}

  


}); // End require(['jQuery', 'Backbone'] ...




