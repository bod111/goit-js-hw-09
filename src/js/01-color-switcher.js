const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onColorChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
console.log('onColorChange ~ window', window);

function onColorChange(e) {
  colorId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(colorId);
  console.log('Interval has stopped!');
});
