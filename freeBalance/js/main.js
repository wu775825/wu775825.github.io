function preview(Class){
  $('body').append('<div class="yuLanBox"><img style="width: 100%;"/></div>');
    //图片预览
    $(Class).on('click',function(){
      var img_url=$(this).attr('src');
      $('.yuLanBox').fadeIn(300).css('display','flex');
      $('.yuLanBox img').attr('src',img_url);
      
    })
    $('.yuLanBox').click(function(){
      $(this).fadeOut(300)
    })  
}