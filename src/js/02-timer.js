import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputElem = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() >= options.defaultDate.getTime()) {
      startBtn.disabled = false;
    } else Notiflix.Notify.failure('Please choose a date in the future', function cb() {});
  },
};
flatpickr(inputElem, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  daysValue.textContent = addLeadingZero(days);
  const hours = Math.floor((ms % day) / hour);
  hoursValue.textContent = addLeadingZero(hours);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  minutesValue.textContent = addLeadingZero(minutes);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  secondsValue.textContent = addLeadingZero(seconds);
  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', e => {
  const selectedDate = new Date(inputElem.value);

  let timerId = 0;
  timerId = setInterval(() => {
    if (new Date(selectedDate) <= new Date(Date.now())) {
      return clearInterval(timerId);
    }
    const difference = new Date(selectedDate) - new Date(Date.now());
    convertMs(difference);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
