const question = document.querySelector('#question');
const quizChoices = Array.from(document.querySelectorAll('.game-text'));
const begainText = document.querySelector('#begainText');
const scoreText = document.querySelector('#score');
const begainBarFull = document.querySelector('#begainBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let aviableQuestions = [];


let quizQustions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Hyper Translate Makup Language',
        choice2: 'Hyper Text Markup Language',
        choice3: 'Holder Text Markup Language',
        choice4: 'Text Markup Language',
        answer: 2,
    },
    {
        question: 'What is the difference between an opening tag and a closing tag?',
        choice1: 'Opening tag has a / in front',
        choice2: 'None of above',
        choice3: 'All is correct',
        choice4: 'Closing tag has a / in front',
        answer: 4,
    },
    {
        question: '< br  / > What type of tag is this?',
        choice1: 'Space',
        choice2: 'Broken single',
        choice3: 'Break tag',
        choice4: 'A Break',
        answer: 3,
    },
    {
        question: '< / body > Is this an opening tag or a closing tag?',
        choice1: 'Close tag',
        choice2: 'Open',
        choice3: 'enable tag',
        choice4: 'break line',
        answer: 1,
    },
    {
        question: 'What is the name of this course?',
        choice1: 'Frontend',
        choice2: 'Web Frontend',
        choice3: 'Web frontend Development II',
        choice4: 'Web Development',
        answer: 3,
    },
]

const SCROE_POINTS = 100;
const MAX_QUESTIONS = 4;

begainGame = () =>{
    quesCounter = 0;
    score = 0;
    aviableQuestions = [...quizQustions];
    begainNewQuestion();

}

begainNewQuestion = () => {
    if(aviableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./game-end.html');
    }

    questionCounter++;
    begainText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    begainBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random()* aviableQuestions.length);
    currentQuestion = aviableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    quizChoices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    })

    acceptingAnswers.splice(questionIndex, 1);
    acceptingAnswers = false;
}

quizChoices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = true;
        const selectedQuizChioce = e.target;
        const selectedQuizAnswer =  selectedQuizChioce.dataset['number'];

        let classToApply = selectedQuizAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply ===  'correct'){
            inScore(SCROE_POINTS);
        }
        selectedQuizChioce.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedQuizChioce.parentElement.classList.remove(classToApply);
            begainNewQuestion();
        }, 1000)
    })
})

inScore = num => {
    score +=num;
    scoreText.innerText = score;
};

begainGame();