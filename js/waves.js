const footer_trigger = scrollMonitor.create(document.querySelector('#footer-trigger'));
const hero = document.querySelector('header');

$(document).ready(function() {
  $('#menu').slicknav();

  footer_trigger.enterViewport(function() {
    $('footer').fadeIn();
  });
  
});


