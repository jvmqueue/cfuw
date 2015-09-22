define(['jQuery', 'Backbone'], function($, Backbone, undefined){
  
      var View = Backbone.View.extend({
        initialize:function(){
            console.group('VIEW');
                console.log(':\t', 'Reached');
               console.groupEnd(); 
        }
      });

});
      