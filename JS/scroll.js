$(document).ready(() => {
 
  $('a[href^="#"]').click(function(){
    let href = $(this).attr('href');
    let target = $(href == '#' || href === '' ? 'html' : href);
    let position = target.offset().top;

    $('html,body').animate({scrollTop : position}, 600);

    return false;
  });
});
