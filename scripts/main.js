require(['homeView'], 
  function(homeView, undefined){

  var w = window, d = document;

  var interval = w.setInterval(function(){ // we don't need jQuery to wait for DOM
    if(d.getElementsByTagName('div').length > 1){
      w.clearInterval(interval);
      var view = new homeView.View();
    }
  }, 33);

}); // End require(['jQuery', 'Backbone'] ...




