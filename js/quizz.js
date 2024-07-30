const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");
let logoutBtn = document.getElementById("logoutBtn");
let startBtn = document.getElementById("start-btn");
let genderSelection = document.getElementById("gender-selection");
let quizzDiv = document.querySelector(".quizz");
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let gender = "";

// Function to fetch questions from JSON file
async function fetchQuestions() {
  try {
    const response = await fetch("../questions.json");
    questions = await response.json();
    startQuiz();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  genderSelection.style.display = "none";
  quizzDiv.style.display = "block";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `<p>${questionNo}. ${currentQuestion.question}</p>`;
  if (currentQuestion.image) {
    questionElement.innerHTML += `<img src="${currentQuestion.image}" alt="Question Image">`;
  }
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
    logoutBtn.style.display = "block";
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startBtn.addEventListener("click", () => {
  const selectedGender = document.querySelector('input[name="gender"]:checked');
  var errorMessage = document.querySelector(".errorMessage");
  if (selectedGender) {
    gender = selectedGender.value;
    errorMessage.textContent = "";
    fetchQuestions();
  } else {
    errorMessage.textContent = "Please select your gender to start the quiz.";
  }
});

window.onload = function() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "../rlogin.html"; // Redirect to login page if not logged in
  }
};

document.getElementById("logoutBtn").addEventListener("click", function() {
  // Reset login state in local storage
  localStorage.removeItem("loggedIn");
  // Redirect to login.html
  window.location.href = "../rlogin.html";
});

function submitQuizResults() {
  try {
    const xhr = new XMLHttpRequest();
    //xhr.open("POST", "http://localhost:3306/submit-quiz", true);
    xhr.open("POST", "https://bgat-server.onrender.com/submit-quiz", true);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 201) {
          console.log("Quiz results submitted successfully:", xhr.responseText);
        } else {
          console.error("Failed to submit quiz results:", xhr.responseText);
        }
      }
    };
    const data = JSON.stringify({ gender: gender, score: score });
    console.log("DATA", data);
    xhr.send(data);
  } catch (error) {
    console.log("Error from submit quiz", error);
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>Gender: ${gender}`;
  nextButton.innerHTML = "Retake Quiz";
  nextButton.style.display = "block";

  // Submit the quiz results to the server
  console.log("Submitting quiz results...");
  submitQuizResults();
}
