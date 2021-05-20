class CountdownTimer{
  constructor({targetDate, selector}){  
    this.targetDate = targetDate,
    this.selector = selector,      
    this.start(),
    this.refs = {  
      days: document.querySelector('[data-value="days"]'),      
      hours: document.querySelector('[data-value="hours"]'),  
      mins: document.querySelector('[data-value="mins"]'),  
      secs: document.querySelector('[data-value="secs"]'),  
    }    
  }
  start(){
    const startTime = this.targetDate;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.updateClockFace(time)
    })
  }
  pad(value){
  return String(value).padStart(2, '0');
  }

  getTimeComponents(time) {
  /*
  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
  */
  const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
  * остатка % и делим его на количество миллисекунд в одном часе
  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
  */
  const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  /*
  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
  */
  const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
  * миллисекунд в одной секунде (1000)
  */
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

  return {days, hours, mins, secs}
  }

  updateClockFace({days, hours, mins, secs}){
    this.refs.days.textContent = `${days}`
    this.refs.hours.textContent = `${hours}`
    this.refs.mins.textContent = `${mins}`
    this.refs.secs.textContent = `${secs}`
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 10, 2021'),
});