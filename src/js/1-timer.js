import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = null;
let countdownInterval = null;


const pickTime = document.querySelector("#datetime-picker");
const buttonStart = document.querySelector("[data-start]");
const buttonStop = document.querySelector("[data-stop]");
const daysCount = document.querySelector("[data-days]");
const hoursCount = document.querySelector("[data-hours]");
const minutesCount = document.querySelector("[data-minutes]");
const secondsCount = document.querySelector("[data-seconds]");

buttonStart.disabled = true;
buttonStop.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }

    resetTimer();

    if (selectedDate.getTime() < new Date().getTime()) {
      iziToast.error({
            message: 'Please choose a date in the future',
            position: 'topRight',
            close: false,
            progressBar: false
        });
      buttonStart.disabled = true;
      buttonStop.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      buttonStart.disabled = false;
      buttonStop.disabled = true;
    }
  },
};

flatpickr(pickTime, options);

buttonStart.addEventListener("click", () => {
  if (!userSelectedDate) {
      iziToast.error({
          message: 'Please choose a date in the future',
          position: 'topRight',
          close: false,
          progressBar: false
      });
    return;
  }

  buttonStart.disabled = true;
  buttonStop.disabled = false;
  pickTime.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate.getTime() - now.getTime();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      resetTimer();
      pickTime.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
});

buttonStop.addEventListener("click", () => {
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  pickTime.disabled = false;

  userSelectedDate = null;
  countdownInterval = null;
  resetTimer();
})

function convertMs(ms) {
    const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remain
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimer(days, hours, minutes, seconds) {
  daysCount.textContent = addLeadingZero(days);
  hoursCount.textContent = addLeadingZero(hours);
  minutesCount.textContent = addLeadingZero(minutes);
  secondsCount.textContent = addLeadingZero(seconds);
}

function resetTimer() {
    daysCount.textContent = "00";
  hoursCount.textContent = "00";
  minutesCount.textContent = "00";
  secondsCount.textContent = "00";
}