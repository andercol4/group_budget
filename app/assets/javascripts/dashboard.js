
$(document).ready(function() {
  var origheight = $("#trans1").height();
  var height = $(window).height();
  if (height > origheight) {
    $("#trans1").height(height);
  }
  
  $(window).scroll(function(){
    var x = $(this).scrollTop();
    $('#trans1').css('background-position','center -'+parseInt(x/5)+'px');
});
  
});

/*
Parralax Demo
Copyright 2013 - Adam Boutcher
Code: GPLv3
Imgs: Personal, Do not reuse.

Tested and Working on:
Desktop - Chrome 25
        - Firefox 19
        - IE 9/10
Mobile  - Chrome on Android

Works in IE7 (Non-Graceful Fallback - USE big images!)
Android Browser is Broken, it doesn't scroll.

Maybe add an infinate scrolling type thing?

Added an example where the background scrolls with the scroll bar at a different pace; this doesn't work from center but I'm sure that's just my maths.
*/
