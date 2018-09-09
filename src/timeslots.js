import Time from './Time'
import { pp } from './functions'

export class TimeSlot {
  constructor(day, startHour, startMinute) {
    this.day = day;
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
  new TimeSlot('Thursday', 8, 0),
  new TimeSlot('Thursday', 8, 30),
  new TimeSlot('Thursday', 9, 0),
  new TimeSlot('Thursday', 9, 30),
  new TimeSlot('Thursday', 10, 0),
  new TimeSlot('Thursday', 10, 30),
  new TimeSlot('Thursday', 11, 0),
  new TimeSlot('Thursday', 11, 30),
  new TimeSlot('Thursday', 12, 0),
  new TimeSlot('Thursday', 12, 30),
  new TimeSlot('Thursday', 13, 0),
  new TimeSlot('Thursday', 13, 30),
  new TimeSlot('Thursday', 14, 0),
  new TimeSlot('Thursday', 14, 30),
  new TimeSlot('Thursday', 15, 0),
  new TimeSlot('Friday', 8, 0),
  new TimeSlot('Friday', 8, 30),
  new TimeSlot('Friday', 9, 0),
  new TimeSlot('Friday', 9, 30),
  new TimeSlot('Friday', 10, 0),
  new TimeSlot('Friday', 10, 30),
  new TimeSlot('Friday', 11, 0),
  new TimeSlot('Friday', 11, 30),
  new TimeSlot('Friday', 12, 0),
  new TimeSlot('Friday', 12, 30),
  new TimeSlot('Friday', 13, 0),
  new TimeSlot('Friday', 13, 30),
  new TimeSlot('Friday', 14, 0),
  new TimeSlot('Friday', 14, 30),
  new TimeSlot('Friday', 15, 0),
];

export default timeslots;