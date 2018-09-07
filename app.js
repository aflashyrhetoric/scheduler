const HOUR = 60;
let colleges = [];

class Time {
  constructor(hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
  }
}

function getEnd(startTime, duration) {
  let newTime = {};
  let remainder = (startTime.minutes + duration) % 60;

  if(startTime.minutes + duration >= 60) {
    newTime = new Time(startTime.hours + 1, remainder);
  } else {
    newTime = new Time(startTime.hours, startTime.minutes + remainder);
  }
  return newTime;
}

function pp(time) {
  let AMPM = time.hours < 12 ? 'AM' : 'PM';
  let displayHours = time.hours > 12 ? time.hours % 12 : time.hours;
  if(time.minutes == 0) {
    time.minutes = '00';
  }
  return `${displayHours}:${time.minutes}${AMPM}`;
}

class Wheatley {
  constructor(startHour, startMinute) {
    this.startTime = new Time(startHour, startMinute);
    this.duration = 50;
    this.endTime = getEnd(this.startTime, this.duration);
  }
}

class Reading {
  constructor(startHour, startMinute) {
    this.startTime = new Time(startHour, startMinute);
    this.duration = 60;
    this.endTime = getEnd(this.startTime, this.duration);
  }
}

class Writing {
  constructor(startHour, startMinute) {
    this.startTime = new Time(startHour, startMinute);
    this.duration = 45;
    this.endTime = getEnd(this.startTime, this.duration);
  }
}

class SharedText {
  constructor(startHour, startMinute, duration) {
    this.startTime = new Time(startHour, startMinute);
    this.duration = duration;
    this.endTime = getEnd(this.startTime, this.duration);
  }
}

let Hampton = {
  slots: [
    new Wheatley(8, 10),
    new Reading(11, 0),
    new Writing(12, 0),
    new SharedText(2, 15, 25)
  ],
}

let Pittsburgh = Object.assign({}, Hampton);
let Temple = Object.assign({}, Hampton);

colleges.push(Hampton, Pittsburgh, Temple);

colleges.forEach( college => {
  college.slots.forEach(timeSlot => {
    console.log(timeSlot);
  });
})


// console.log(pp(Hampton.classes[0].endTime));

