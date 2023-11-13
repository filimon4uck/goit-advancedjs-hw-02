let interval;
const start = document.querySelector('.js-start-btn');
const stop = document.querySelector('.js-stop-btn');

stop.disabled = true;

start.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;
  interval = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});
stop.addEventListener('click', () => {
  start.disabled = false;
  stop.disabled = true;
  clearInterval(interval);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
