import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dataTimePicker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

buttonStart.setAttribute('disabled', true);

const picker = flatpickr(dataTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    buttonStart.removeAttribute('disabled');
    console.log(selectedDates[0]);
  },
});
buttonStart.addEventListener('click', el => {
  el.target.setAttribute('disabled', true);
  const timer = setInterval(() => {
    const diference = picker.selectedDates[0] - Date.now();

    if (diference <= 0) {
      clearInterval(timer);
      return;
    }
    console.log(convertMs(diference));
    const { days, hours, minutes, seconds } = convertMs(diference);
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
