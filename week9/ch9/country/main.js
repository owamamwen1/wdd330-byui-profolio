const url = 'https://owamamwen.glitch.me/questions.json';

fetch(url)
  .then(res => res.json())
  .then(quizQeustion => {
    view.start.addEventListener('click', () => game.start(quizQeustion.questions), false);
    view.response.addEventListener('click', (event) => game.checkQuestion(event), false);
});

function randomQuestion(a,b=1) {
  if (b === 1) {
	  [a,b] = [b,a];
  }
  return Math.floor((b-a+1) * Math.random()) + a;
}

function shuffle(array) {
  for (let i = array.length; i; i--) {
      let j = randomQuestion(i)-1;
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
}

const view = {
  question: document.querySelector('.question'),
  score: document.querySelector('.score strong'),
  result: document.querySelector('.result'),
  start: document.querySelector('.start'),
  info: document.querySelector('.info'),
  response: document.querySelector('.response'),
  timer: document.querySelector('.timer strong'),
  render(target,content,attributes) {
      for(const key in attributes) {
        target.setAttribute(key, attributes[key]);
      }
      target.innerHTML = content;
  },
  show(element){
    element.style.display = 'block';
  },
  hide(element){
    element.style.display = 'none';
  },
  setup(){
    this.render(this.score,game.score);
    this.render(this.result,'');
    this.render(this.info,'');
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
  },
  teardown(){
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  },
  buttons(arr){
    return arr.map(value => `<button>${value}</button>`).join('');
  }
};

const game = {
  start(quiz){
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.sRemaining = 25;
    this.timer = setInterval( this.countdown , 1000 );
    this.askQuestion();
  },
  countdown() {
    game.sRemaining--;
    view.render(view.timer,game.sRemaining);
      if(game.sRemaining <= 0) {
        game.gameOver();
      }
  },
  askQuestion(country){
    if(this.questions.length > 2) {
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [this.questions[0].capitalCity, this.questions[1].capitalCity, this.question.capitalCity];
      shuffle(options);
      const question = `What is the capital city of ${this.question.country}?`;
      view.render(view.question,question);
      view.render(view.response,view.buttons(options));
    }
    else {
      this.gameOver();
    }
  },
  checkQuestion(event){
    const response = event.target.textContent;
    const answer = this.question.capitalCity;
    if(response === answer){
      view.render(view.result,'Correct!',{'class':'correct'});
      this.score++;
      view.render(view.score,this.score);
    } else {
      view.render(view.result,`The correct answer '${answer}'`,{'class':'incorrect'});
    }
    this.askQuestion();
  },
  gameOver(){
    view.render(view.info,`Game Over, your score is ( ${this.score} ) point${this.score !== 1 ? 's' : ''}`);
    view.teardown();
    clearInterval(this.timer);
  }
}
