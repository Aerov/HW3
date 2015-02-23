// R Vets
// Feb 22
// CodeFellows C26, HW5 (or close enough)
// jQuery only file to change the apperance of the page

$(document).ready(function(){ 
  $('#launchBttn').on('click', function(){
    $('#intro').hide();
    $('#selectionstuff').css('visibility','visible');
  });
});
