require(['jQuery', 'Backbone', 'home'], function($, Backbone, home, undefined){

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

      switch(strInnerHtml){
        case 'board':          
          /*!modelHome ? modelHome = new home.fnc.Model() : console.log('is instantiated');*/
          modelHome = home.fnc.getInstance();
          modelHome.fetch({
            url:'data/board.xml',
            success:function(paramXhr){
              /*modelHome.set('data', );*/
              console.group('FETCH');
                console.log('paramXhr:\t', paramXhr);
               console.groupEnd(); 
            }
          });
          this.models.add(modelHome);
          console.group('CASE BOARD');
            console.log('models 1:\t', this.models.models[0].get('author'));
           console.groupEnd(); 
          break;
        default:
          console.group('DEFAULT');
            console.log(':\t', 'Discovered undefined case');
           console.groupEnd(); 
      }
    },
    getHome:function(e){
      console.group('GET Home');
        console.log(':\t', 'Reached');
       console.groupEnd(); 
    }            
  });  

 



  $(document).ready(
    function(){
      /*$('#navBarTop').on('click', function(){console.log('Reached nav bar click:\t', '');});*/
      var view = new View();
    }
  );
  


}); // End require(['jQuery', 'Backbone'] ...




