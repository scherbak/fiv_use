/*
Plugin Name: iSocial
Version: 1.0
Description: jQuery Plugin for Social Linking
Author: ivan Scherbak 
*/

(function($) {
	
  $.fn.isocial = function(options) {
    
    var options = $.extend({
      icons : { 
        twitter		 : null, 
        facebook	 : null, 
        flickr		 : null, 
        friendfeed : null, 
        delicious  : null, 
        digg		   : null, 
        lastfm		 : null, 
        linked		 : null, 
        youtube		 : null, 
        feed		   : null
      },
      attrs		: {
        'target' : '_blank',
        'class'  : 'isLink'
      }, 
      nameSpace  : 'isLinksSmall',  // custom class name
      mainPrefix : 'horizontal', // horizontal else vertical set in css
      customCss  : '' //custom style reserved
    },options);
		
	
    return this.each(function() {
		
      var o = options;
      var list = '<ul class="'+o.nameSpace+' '+o.nameSpace+'-'+o.mainPrefix+'">';
			
      $.each(o.icons, function(className, url){
        if(url){
          var link = $('<a>');
          link.attr(o.attrs);
          link.attr('href', 'http://' + url );
          link.addClass(o.nameSpace+'-' + className);
          link.text(className);
          
          list += '<li>'+link.get(0).outerHTML+'</li>';
        }
      })

      list += '</ul>';
			
      if(o.customCss){
        list+='<style>'+o.customCss+'</style>';
      }
      
      $(this).append(list);
      return true;
    });
  }
  
})(jQuery);
