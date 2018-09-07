const HOUR = 60;

class Time {
  constructor(hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
  }
}

function getEnd(startTime, duration) {
  let newTime = {};
  let remainder = 0;

  if(startTime.minutes + duration >= 60) {
    remainder = startTime.minutes % 60;
    newTime = new Time(startTime.hours + 1, remainder);
  } else {
    newTime = new Time(startTime.hours, startTime.minutes + remainder);
  }
  return newTime;
}

function pp(time) {
  return `${time.hours}:${time.minutes}`;
}

class Wheatley {
  constructor(startHour, startMinute) {
    this.startTime = new Time(startHour, startMinute);
    this.duration = 50;
    this.endTime = getEnd(this.startTime);
  }
}

let hampton = {
  classes: [
    new Wheatley(8, 10),
  ],
}

console.log(pp(hampton.classes[0].endTime));

