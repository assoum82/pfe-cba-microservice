(function() {

  var serverCallForExam;
  $('#not-valid-code-txt').hide();
  $('#exam-details').css('opacity', .3);

  $('input[name="code"]').on('keyup', function(){
    var code = $(this).val();
    clearTimeout(serverCallForExam);
    serverCallForExam = setTimeout(function(){
      $.post("/exam/code", {examCode:code},function( data ) {
        $('#exam-details').css('opacity', 1);
        $('#nb-questions').html(data.questions.length + " questions");
        $('#time').html(data.duration + " minutes");
        $('#documentation-auth').html(data.documentation ? "Authorized" : "Not authorized");
        $('#not-valid-code-txt').hide();
      }).error(function() {
        $('#exam-details').fadeTo( "slow" , 0.3, function() {
          $('#not-valid-code-txt').show();
        });
      });
    },2000);
  });

  $('#login-form').submit(function(){
    localStorage.setItem('etest-student-name', $('input[name="name"]').val());
  });
}());
