(function() {
  var code = getExamCode();
  var studentName = localStorage.getItem('etest-student-name');
  var maxTime = getExamLength() * 60 * 1000;
  var candidatsLog = {
    'cheatingAttempts' : [],
    'time': 0
  };

  /**
  * Handle form submit
  */

  var submitAnswer = function(e){
    e.preventDefault();
    candidatsLog.time = maxTime / 1000;
    $('input[name="candidat"]').val(JSON.stringify(candidatsLog));
    $('input[name="code"]').val(code);
    $('input[name="name"]').val(studentName);
    $('#answering-form').submit();
  };

  $('#submit-btn').on('click', submitAnswer);

  Mousetrap.bind(['command+s','ctrl+s'], submitAnswer);

  /**
  * Countdown
  */
  var countdownTimer;
    countdownTimer = setInterval(function(){
      if (maxTime === 0) {
        submitAnswer();
        clearInterval(countdownTimer);
      }else {
        maxTime -= 1000;
        $('#countdown').html(moment.utc(maxTime).format('HH:mm:ss'));
      }
    },1000);

    $('#countdown').on('click', function(){
      $(this).toggleClass('timeCounter');
    })

  /**
  * Marked.js setup
  */
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  $('.question-text').each(function(){
    $(this).html(marked($(this).text()));
  });

  /**
  * Prevent cheats
  */
  function noCheatPlease(event){
    event.preventDefault()
    candidatsLog.cheatingAttempts.push(event.type)
    console.log('Cheating attempt detected, the teacher will be notified');
  }

  Mousetrap.bind(['command+u','ctrl+u','f12'], noCheatPlease);
  $(document).on("contextmenu",noCheatPlease);
  $(document).mouseleave(noCheatPlease);

  /* var app = new Vue({
    el: '#edit',
    data: {
      questions: "",

    },
    methods: {
      shuffleQuestions: function() {
        this.questions = _.shuffle(this.questions);
        this.examCode = Math.random().toString(36).substring(2,6).toUpperCase();
      }
    }

  });*/

}());
