class Time {
  constructor(hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
  }
  convertToSeconds() {
    let seconds = 0;
    seconds += this.hours * 60 /* minutes */ * 60 /* seconds */;
    seconds += this.minutes * 60 /* seconds */;
    return seconds;
  }
}

function pp(time) {
  let AMPM = time.hours < 12 ? 'AM' : 'PM';
  let displayHours = time.hours > 12 ? time.hours % 12 : time.hours;
  if(time.minutes == 0) {
    time.minutes = '00';
  }
  return `${displayHours}:${time.minutes}${AMPM}`;
}

class TimeSlot {
  constructor(startHour, startMinute) {
    this.startTime = new Time(startHour, startMinute);
    if(startMinute + 30 >= 60) {
      this.endTime = new Time(startHour + 1, (startMinute + 30) % 60);
    } else {
      this.endTime = new Time(startHour, startMinute + 30);
    }
    this.toString = function() {
      return `${pp(this.startTime)} - ${pp(this.endTime)}`;
    }
  }
}

const timeslots = [
  new TimeSlot(8, 0),
  new TimeSlot(8, 30),
  new TimeSlot(9, 0),
  new TimeSlot(9, 30),
  new TimeSlot(10, 0),
  new TimeSlot(10, 30),
  new TimeSlot(11, 0),
  new TimeSlot(11, 30),
  new TimeSlot(12, 0),
  new TimeSlot(12, 30),
  new TimeSlot(13, 0),
  new TimeSlot(13, 30),
  new TimeSlot(14, 0),
  new TimeSlot(14, 30),
  new TimeSlot(15, 0),
];

export default timeslots;