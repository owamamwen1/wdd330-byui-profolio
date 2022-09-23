const quizHighScoresList = document.querySelector('#highScoresList');
const quizHighScores = JSON.parse(localStorage.getItem('highScores')) || [];


quizHighScoresList.innerHTML =  quizHighScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')