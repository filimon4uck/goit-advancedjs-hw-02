import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const delayIn = document.querySelector('[name=delay]');
const stepIn = document.querySelector('[name="step"]');
const amountIn = document.querySelector('[name=amount]');

const form = document.querySelector('form');
form.addEventListener('submit', ev => {
  ev.preventDefault();
  let delay = Number(delayIn.value);
  const step = Number(stepIn.value);
  const amount = Number(amountIn.value);

  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        iziToast.success({
          message: `Fulfilled promise ${position} in ${delay}ms`,
          position: 'center',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          message: `Rejected promise ${position} in ${delay}ms`,
          position: 'center',
        });
      });
    delay += step;
  }
});
