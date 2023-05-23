
var quizdata;

const question_element = document.getElementById("question-text")
const a_element = document.getElementById("a-text")
const b_element = document.getElementById("b-text")
const c_element = document.getElementById("c-text")
const d_element = document.getElementById("d-text")
const main_box_element = document.getElementById('main-box');
const upper_box_element = document.getElementById('upper-box');


function getSelectedOption() {
    const answerElements = document.querySelectorAll(".answer")

    let answer = undefined;
    answerElements.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.value;
        }
    })
    return answer;
}

function loadQuiz(quizdata, currentQuestionNo) {
    let currentQuestion = quizdata[currentQuestionNo];

    question_element.innerHTML = currentQuestion['question'];
    a_element.innerHTML = currentQuestion['a'];
    b_element.innerHTML = currentQuestion['b'];
    c_element.innerHTML = currentQuestion['c'];
    d_element.innerHTML = currentQuestion['d'];
}

var currentQuestionNo = 0
    
fetch('./quizdata.json')
.then((res) => res.json())
.then((json) => {
    console.log("got the json data")
    quizdata = json
    let totalQuestions = json.length
    let score = 0;
    console.log(totalQuestions)
    submitBtn.addEventListener('click', () => {
        if(currentQuestionNo == totalQuestions) {
            currentQuestionNo = 0;
            loadQuiz(quizdata, currentQuestionNo)

        }
        let selectedAnswer = getSelectedOption()
        if (selectedAnswer == quizdata[currentQuestionNo].correct) {
            score++;
        }

        currentQuestionNo++;
        if (currentQuestionNo >= totalQuestions) {
            upper_box_element.innerHTML = `<h2>Your score is ${score}/${totalQuestions}</h2> <button onClick="location.reload()">Reload</button>`            
            main_box_element.removeChild(document.getElementById('submitBtn'))            
        } else {
            loadQuiz(quizdata, currentQuestionNo)
        }
    });

    loadQuiz(quizdata, currentQuestionNo)
    
})


