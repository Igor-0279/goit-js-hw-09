const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', startRandomColor);
stopButton.addEventListener('click', stopRandomColor);
let interval = 0;

function startRandomColor(){
 interval = setInterval(changeBackgroundColor, 1000);
 startButton.disabled = true;
}

function stopRandomColor() {
  clearInterval(interval);
  startButton.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBackgroundColor(){
  document.body.style.backgroundColor = getRandomHexColor();
}

