const canvas = document.getElementById('canvas-fibonacci');
const fibo = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
fibo.globalCompositeOperation = 'destination-over';

let number = 0;
let scale = 10;

function fibonacciFlower(){
  let angle =  number * 3.343;
  let radius =  scale *  Math.sqrt(number);
  let positionX = radius * Math.sin(angle) + canvas.width/2;
  let positionY = radius * Math.cos(angle) + canvas.width/2;

fibo.fillStyle = 'gray';
fibo.strokeStyle = 'black';
fibo.lineWidth = 4;
fibo.beginPath();
fibo.arc(positionX, positionY, 5, 0, Math.PI * 2);
fibo.closePath();
fibo.fill();
fibo.stroke();

number++ ;
}

function fibonacciAnimate(){
// fibo.clearRect(0, 0, canvas.width, canvas.height);
fibonacciFlower();
if(number > 500){
  return;
}
requestAnimationFrame(fibonacciAnimate);
}

fibonacciAnimate();