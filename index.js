const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
let answers;
let score = localStorage.getItem("score");

/////////////////////////////////////////////////////////////////////////////////////////

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
  const randomNumber1 = randomNumber(1, 10);
  const randomNumber2 = randomNumber(1, 10);
  const questionType = randomNumber(1, 4);
  let number1;
  let number2;
  let question;
  let answer;
  if (randomNumber1 > randomNumber2 && questionType > 2) {
    number1 = randomNumber1;
    number2 = randomNumber2;
  } else {
    number1 = randomNumber2;
    number2 = randomNumber1;
  }

  switch (questionType) {
    case 1:
      question = `Q.  ${number1} multiply to ${number2}`;
      answer = number1 * number2;
      break;
    case 2:
      question = `Q. ${number1} add to ${number2}`;
      answer = number1 + number2;
      break;
    case 3:
      question = `Q.  ${number1} minus ${number2}`;
      answer = number1 - number2;
      break;
    case 4:
      question = `Q. What is ${number1} divide by ${number2}`;
      answer = number1 / number2;
      break;
    default:
      question = `Q.  ${number1} divide by ${number2}`;
      answer = Math.floor(number1 / number2);
      break;
  }

  return { question, answer };
};

const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  scoreEl.innerText = score;
  answers = answer;
};
showQuestion();
const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(questionFormEl);
  const userAnswer = +formData.get("answer");
  if (userAnswer === answers) {
    score += 1;
    Toastify({
      text: `Correct Answer! Score: ${score}`,
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    score -= 1;
    Toastify({
      text: `Incorrect Answer Score: ${score}`,
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #e33217, #96c93d)",
      },
    }).showToast();
  }
  console.log("count");
  scoreEl.innerText = score;
  localStorage.setItem("score", score);
  event.target.reset();
  showQuestion();
};
