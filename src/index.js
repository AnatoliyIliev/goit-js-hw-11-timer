refs = {
  selectorTimer: document.querySelector(selector),
  days: document.querySelector('data-value="days"'),
  hours: document.querySelector('data-value="hours"'),
  mins: document.querySelector('data-value="mins"'),
  secs: document.querySelector('data-value="secs"'),
}

class CountdownTimer{
  constructor(){
    this.intervalId = null;
  }
  start(){
    const startTime = Date.now();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = getTimeComponents(deltaTime);

      // updateClockFace(time);

    }, 1000)
  }  
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});

function updateClockFace({days, hours, mins, secs}){
  refs.days.textContent = `${days}`
  refs.hours.textContent = `${hours}`
  refs.mins.textContent = `${mins}`
  refs.secs.textContent = `${secs}`
}

function pad(value){
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

return {days, hours, mins, secs}
}