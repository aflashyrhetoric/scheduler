import Time from './Time'
import { pp } from './functions'

export class TimeSlot {
  constructor(startHour, startMinute, day = 'template') {
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
  static allSlots() {
    return [
      new TimeSlot(8, 0),
      new TimeSlot(8, 30),
      new TimeSlot(9, 0),
      new TimeSlot(9, 45),
      new TimeSlot(10, 0),
      new TimeSlot(10, 30),
      new TimeSlot(11, 0),
      new TimeSlot(11, 30),
      new TimeSlot(12, 0),
      new TimeSlot(12, 30),
      new TimeSlot(13, 0),
      new TimeSlot(13, 15),
      new TimeSlot(14, 0),
      new TimeSlot(14, 10),
      new TimeSlot(15, 0),
    ];
  }

}

const timeslots = [
  new TimeSlot(8, 0, 'Thursday'),
  new TimeSlot(8, 30, 'Thursday'),
  new TimeSlot(9, 0, 'Thursday'),
  new TimeSlot(9, 45, 'Thursday'),
  new TimeSlot(10, 0, 'Thursday'),
  new TimeSlot(10, 30, 'Thursday'),
  new TimeSlot(11, 0, 'Thursday'),
  new TimeSlot(11, 30, 'Thursday'),
  new TimeSlot(12, 0, 'Thursday'),
  new TimeSlot(12, 30, 'Thursday'),
  new TimeSlot(13, 0, 'Thursday'),
  new TimeSlot(13, 15, 'Thursday'),
  new TimeSlot(14, 0, 'Thursday'),
  new TimeSlot(14, 10, 'Thursday'),
  new TimeSlot(15, 0, 'Thursday'),
  new TimeSlot(8, 0, 'Friday'),
  new TimeSlot(8, 30, 'Friday'),
  new TimeSlot(9, 0, 'Friday'),
  new TimeSlot(9, 45, 'Friday'),
  new TimeSlot(10, 0, 'Friday'),
  new TimeSlot(10, 30, 'Friday'),
  new TimeSlot(11, 0, 'Friday'),
  new TimeSlot(11, 30, 'Friday'),
  new TimeSlot(12, 0, 'Friday'),
  new TimeSlot(12, 30, 'Friday'),
  new TimeSlot(13, 0, 'Friday'),
  new TimeSlot(13, 15, 'Friday'),
  new TimeSlot(14, 0, 'Friday'),
  new TimeSlot(14, 10, 'Friday'),
  new TimeSlot(15, 0, 'Friday'),
];

export default timeslots;