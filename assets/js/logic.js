var currentQuestionIndex = 0;
var time = 0;
var timerId;

var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
    startBtn.style.display = 'none';
    time = questions.length * 15;
    timerId = setInterval(function () {
      time--;
      timerEl.textContent = 'Time: ' + time;
  
      if (time <= 0 || currentQuestionIndex >= questions.length) {
        endQuiz();
      }
    }, 1000);
  
    showQuestion(currentQuestionIndex);
  }
  
  function showQuestion(index) {
    var question = questions[index];
    questionsEl.textContent = question.title;
    choicesEl.innerHTML = '';
  
    for (var i = 0; i < question.choices.length; i++) {
      var choice = document.createElement('button');
      choice.textContent = question.choices[i];
      choice.addEventListener('click', checkAnswer);
      choice.setAttribute('data-index', i);
      choicesEl.appendChild(choice);
    }
  }
  
function checkAnswer(event) {
  var selectedChoice = event.target;
  var selectedIndex = parseInt(selectedChoice.getAttribute('data-index'));
  var correctIndex = questions[currentQuestionIndex].answer;

  if (selectedIndex === correctIndex) {
    sfxRight.play();
    feedbackEl.textContent = 'Correct!';
  } else {
    sfxWrong.play();
    feedbackEl.textContent = 'Incorrect!';
    time -= 15; 
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);
  timerEl.textContent = 'Time: ' + time;
  questionsEl.textContent = 'Quiz Over!';
  choicesEl.innerHTML = '';

  initialsEl.style.display = 'block';
}

startBtn.addEventListener('click', startQuiz);

submitBtn.addEventListener('click', endQuiz);

