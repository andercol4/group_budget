$(document).ready(function () {
  
  $('.faq-p').hide();
  
  
  $('h5').click(function () {
    $(this).next('.faq-p').slideToggle(500);
    $(this).siblings().next('.faq-p').slideUp(500);
    $(this).addClass('active');
    $(this).siblings('h5').removeClass('active');
    
    // if($(this).children('i').class("fa-caret-square-o-down"))
    // {
    //     $(this).children('img').attr("src" , "http://www.microsoft.com/global/en-us/Legal/PublishingImages/IntellectualProperty/Icon_Expand_Minus_21x21.png")
    //     $(this).siblings('h5').children('img').attr("src" , "http://www.microsoft.com/global/en-us/Legal/PublishingImages/IntellectualProperty/Icon_Expand_Plus_21x21.png")
    // }
    // else{
    //    $(this).children('img').attr("src" , "http://www.microsoft.com/global/en-us/Legal/PublishingImages/IntellectualProperty/Icon_Expand_Plus_21x21.png")
    //    $(this).removeClass('active');
    // }
  });
  
});
