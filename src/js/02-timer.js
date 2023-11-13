import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button');
const date = document.querySelector('#datetime-picker');
const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const currentDate = new Date().getTime();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= currentDate) {
      button.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'center',
      });
    } else {
      button.disabled = false;
    }
  },
};

button.disabled = true;

flatpickr('#datetime-picker', options);

button.addEventListener('click', () => {
  button.disabled = true;
  date.disabled = true;
  const interval = setInterval(() => {
    let diffirentDate = new Date(date.value) - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diffirentDate);
    elements.days.textContent = addLeadingZero(days);
    elements.hours.textContent = addLeadingZero(hours);
    elements.minutes.textContent = addLeadingZero(minutes);
    elements.seconds.textContent = addLeadingZero(seconds);
    if (diffirentDate < 1000) {
      clearInterval(interval);
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const valueToString = String(value);

  return valueToString.padStart(2, '0');
}
