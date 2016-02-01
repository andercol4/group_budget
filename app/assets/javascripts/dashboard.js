// $(function() {
// 	var data = {
//     labels: ["Group1", "March", "April"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fillColor: "rgba(220,220,220,0.5)",
//             strokeColor: "rgba(220,220,220,0.8)",
//             highlightFill: "rgba(220,220,220,0.75)",
//             highlightStroke: "rgba(220,220,220,1)",
//             data: [65, 35, 45]
//         }
//         // {
//         //     label: "My Second dataset",
//         //     fillColor: "rgba(151,187,205,0.5)",
//         //     strokeColor: "rgba(151,187,205,0.8)",
//         //     highlightFill: "rgba(151,187,205,0.75)",
//         //     highlightStroke: "rgba(151,187,205,1)",
//         //     data: [28]
//         // },
//         // {
//         //     label: "My Second dataset",
//         //     fillColor: "rgba(151,187,205,0.5)",
//         //     strokeColor: "rgba(151,187,205,0.8)",
//         //     highlightFill: "rgba(151,187,205,0.75)",
//         //     highlightStroke: "rgba(151,187,205,1)",
//         //     data: [28]
//         // }
//     ]
// 	};	
// 	var ctx = document.getElementById("groupChart").getContext("2d");
// 	var myBarChart = new Chart(ctx).Bar(data, {responsive: true});
// });

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
