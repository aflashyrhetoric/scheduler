import studentRoster from './students';
import timeslots from './timeslots';

let studentList = studentRoster.students;

let colleges = [];
const HOUR = 60;

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

function flatten(arr1) {
  return arr1.reduce((acc, val) => acc.concat(val), []);
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
  constructor(startHour, startMinute, duration = 45) {
    this.startTime = new Time(startHour, startMinute);
    this.duration = duration;
    this.endTime = getEnd(this.startTime, this.duration);
  }
}

class SharedText {
  constructor(startHour, startMinute, duration = 25) {
    this.startTime = new Time(startHour, startMinute);
    this.duration = duration;
    this.endTime = getEnd(this.startTime, this.duration);
  }
}

let Hampton = {
  name: "Hampton",
  courses: [
    new Wheatley(8, 10),
    new Reading(11, 0),
    new Writing(12, 0),
    new SharedText(2, 15)
  ],
}
let Pittsburgh = Object.assign({}, Hampton);
Pittsburgh.name = 'Pittsburgh';
let Temple = Object.assign({}, Hampton);
Temple.name = 'Temple';
let Maryland = {
  name: 'Maryland',
  courses: [
    new Writing(8, 55),
    new Reading(11, 0),
    new SharedText(12, 2, 30),
    new Wheatley(1, 15),
  ],
};
let USC = {
  name: 'USC',
  courses: [
    new Writing(8, 2, 50),
    new Wheatley(8, 55),
    new SharedText(9, 47, 30),
    new Reading(11, 0),
  ],
};
let Albany = {
  name: 'Albany',
  courses: [
    new Wheatley(8, 2),
    new Reading(11, 0),
    new Writing(1, 15, 50),
    new SharedText(3, 5, 30),
  ],
};

// 6 schools with 4 courses each
colleges.push(
  Hampton,
  Pittsburgh,
  Temple,
  Maryland,
  USC,
  Albany
);

// Add kids to colleges
colleges.forEach(college => {
  college.members = [];
  studentList.forEach(student => {
    if(college.name == student.college) {
      college.members.push(student);
    }
  })
  // console.log(`${college.name} has ${college.members.map(member => member.name)}`)
  // console.log(college);
});

/*
 * Get all courses 
 */

let allCourses = colleges.map(college => {
  return college.courses;
});

allCourses = flatten(allCourses);

timeslots.forEach(slot => {
  console.log(slot.toString());
});

/*
 * Student-related utility functions
 */


// console.log(colleges);

// studentList.forEach( student => {
//   console.log(student.name);
// })

// colleges.forEach( college => {
//   console.log(`${college.name}`);
//   college.courses.forEach(course => {
//     console.log(course);
//   });
//   console.log('\n');
// })



