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
  convertToSeconds() {
    let seconds = 0;
    seconds += this.hours * 60 /* minutes */ * 60 /* seconds */;
    seconds += this.minutes * 60 /* seconds */;
    return seconds;
  }
}

function getEndTime(startTime, duration) {
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


class Course {
  constructor(name, startHour, startMinute, duration) {
    this.name = name;
    this.startTime = new Time(startHour, startMinute);
    this.duration = duration;
    this.endTime = getEndTime(this.startTime, this.duration);
  }

  fitsIn(timeSlot) {
    let timeSlotStart = timeSlot.startTime.convertToSeconds();
    let timeSlotEnd = timeSlot.endTime.convertToSeconds();
    let startTimeInSeconds = this.startTime.convertToSeconds();
    let endTimeInSeconds = this.endTime.convertToSeconds();

    return timeSlotStart >= startTimeInSeconds &&
           timeSlotEnd   <= endTimeInSeconds;
  }
}

class Wheatley extends Course {
  constructor(startHour, startMinute) {
    super('Wheatley', startHour, startMinute, 50);
  }
}

class Reading extends Course {
  constructor(startHour, startMinute) {
    super('Reading', startHour, startMinute, 60);
  }
}

class Writing extends Course {
  constructor(startHour, startMinute) {
    super('Writing', startHour, startMinute, 45);
  }
}

class SharedText extends Course {
  constructor(startHour, startMinute) {
    super('SharedText', startHour, startMinute, 25);
  }
}

let Hampton = {
  name: "Hampton",
  courses: [
    new Wheatley(8, 10),
    new Reading(11, 0),
    new Writing(12, 0),
    new SharedText(14, 15)
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
    new Wheatley(13, 15),
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
    new SharedText(15, 5, 30),
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
});

/*
 * Get all courses 
 */

let collegeCourseMap = colleges.map(college => {
  return {
    name: college.name,
    courses: college.courses
  }
});
collegeCourseMap = flatten(collegeCourseMap);


timeslots.forEach(slot => {
  let allCurrentCourses = [];

  collegeCourseMap.forEach( college => {
    let currentCollegeCourses = [];
    currentCollegeCourses = college.courses.filter( college => college.fitsIn(slot));
    if(currentCollegeCourses.length > 0) {
      allCurrentCourses = allCurrentCourses.concat({ college: college.name, courses: currentCollegeCourses});
    }
  });

  // collegeCourseMap.forEach( collegeCourseMapping => {
  //   currentCourses = collegeCourseMapping.filter( college => {
  //     return college.fitsIn(slot);
  //   });
  // });

  if(allCurrentCourses.length > 0) {
    const courseName = allCurrentCourses.map(course => `${course.courses.map(course => course.name)} (${course.college})`);
    console.log(`The courses that fit in the ${slot} are ${courseName}`);
  } else {
    console.log(`There are no courses at ${slot} that you can sit in on.`);
  }
});
