import studentRoster from "./students";
import timeslots from "./timeslots";
import {
  strf,
  str,
  getEndTime,
  pp,
  flatten,
  printClassOverview
} from './functions'

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
    seconds += this.hours * 60 /* minutes */ * 60; /* seconds */
    seconds += this.minutes * 60; /* seconds */
    return seconds;
  }
}

Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};


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

    return (
      timeSlotStart >= startTimeInSeconds && timeSlotEnd <= endTimeInSeconds
    );
  }
}

class Wheatley extends Course {
  constructor(startHour, startMinute) {
    super("Wheatley", startHour, startMinute, 50);
  }
}

class Reading extends Course {
  constructor(startHour, startMinute) {
    super("Reading", startHour, startMinute, 60);
  }
}

class Writing extends Course {
  constructor(startHour, startMinute) {
    super("Writing", startHour, startMinute, 45);
  }
}

class SharedText extends Course {
  constructor(startHour, startMinute) {
    super("SharedText", startHour, startMinute, 25);
  }
}

let Hampton = {
  name: "Hampton",
  courses: [
    new Wheatley(8, 10),
    new Reading(11, 0),
    new Writing(12, 0),
    new SharedText(14, 15)
  ]
};
let Pittsburgh = Object.assign({}, Hampton);
Pittsburgh.name = "Pittsburgh";
let Temple = Object.assign({}, Hampton);
Temple.name = "Temple";
let Maryland = {
  name: "Maryland",
  courses: [
    new Writing(8, 55),
    new Reading(11, 0),
    new SharedText(12, 2, 30),
    new Wheatley(13, 15)
  ]
};
let USC = {
  name: "USC",
  courses: [
    new Writing(8, 2, 50),
    new Wheatley(8, 55),
    new SharedText(9, 47, 30),
    new Reading(11, 0)
  ]
};
let Albany = {
  name: "Albany",
  courses: [
    new Wheatley(8, 2),
    new Reading(11, 0),
    new Writing(1, 15, 50),
    new SharedText(15, 5, 30)
  ]
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

// Shuffle colleges to remove bias a bit
// colleges.shuffle();

// Add kids to colleges
colleges.forEach(college => {
  college.members = [];
  studentList.forEach(student => {
    if (college.name == student.college) {
      college.members.push(student);
    }
  });
});

/*
 * Get all courses 
 */

// college - courses join
let collegeCourseMap = colleges.map(college => {
  return {
    name: college.name,
    courses: college.courses
  };
});

// For each time slot,
timeslots.forEach(slot => {
  let allCurrentCourses = [];
  let maxGroupSize;
  let studentsInCurrentCollege = [];
  let currentCollegeCourses = [];
  slot.groupIsBooked = false;
  slot.scheduledStudents = [];

  // Find the current courses
  collegeCourseMap.forEach(college => {
    currentCollegeCourses = currentCollegeCourses.concat(
      ...college.courses.filter(college => college.fitsIn(slot))
    );

    // If there are any classes, add them
    if (currentCollegeCourses.length > 0) {
      allCurrentCourses = allCurrentCourses.concat({
        college: college.name,
        courses: currentCollegeCourses
      });
    }
  });

  // 8:00AM - 9:00AM - [ CLASSES ]
  // console.log(`${slot.toString()} - ${strf(allCurrentCourses)}`);

  // For each college, find available kids

  allCurrentCourses.forEach(course => {
    // Kids in this college
    studentsInCurrentCollege = studentsInCurrentCollege.concat(
      ...studentList.filter(student => student.college == course.college)
    );
  });

  // str(studentsInCurrentCollege)

  // For each college kid, assign roles
  studentsInCurrentCollege.forEach(student => {
    let hasAlreadyScheduledASlot = false;
    let currentGroupSize = slot.scheduledStudents.length;
    const studentIsNotFullyScheduled = student.mandates
      .filter(mandate => mandate.scheduled)
      .length === 0
    const studentRequiresSoloGroup = student.mandates
      .filter(mandate => mandate.groupLimit == 1)
      .length > 0

    // console.log(`${student.name} - ${!student.mandates.filter(mandate => mandate.scheduled).length === 0}`)

    /* 
     * FOR SOLO SESSIONS
     */
    if (
      currentGroupSize == 0 &&
      studentRequiresSoloGroup &&
      studentIsNotFullyScheduled &&
      !hasAlreadyScheduledASlot
    ) {
      // ...book it!
      student.mandates
        .filter(mandate => !mandate.scheduled)
        .filter(mandate => mandate.groupLimit === 1)
        .forEach(mandate => {
          // Book the kid to the group
          slot.scheduledStudents.push(student);

          // Satisfy one of the kid's requirements
          mandate.scheduled = true;

          // Prevent duplicate booking
          hasAlreadyScheduledASlot = true;

          slot.groupIsBooked = true;
        });
    }

    /* 
     * FOR BOOKING GROUP SESSIONS
     */
    if (
      studentIsNotFullyScheduled &&
      !hasAlreadyScheduledASlot &&
      !slot.groupIsBooked
    ) {

      // console.log(`${student.name}`)

      maxGroupSize = Math.min(
        ...flatten(
          studentsInCurrentCollege.map(student =>
            student.mandates.map(mandate => mandate.groupLimit)
          )
        )
      );

      // Filter through GROUP mandates, mark an appropriate one
      student.mandates
        .filter(mandate => !mandate.scheduled)
        .filter(mandate => mandate.groupLimit > 1)
        .forEach(mandate => {

          // Check that it's the right one
          if (
            currentGroupSize + 1 <= mandate.groupLimit &&
            // currentGroupSize + 1 <= maxGroupSize &&
            !hasAlreadyScheduledASlot
          ) {
            // console.log(`${student.name} - ${studentRequiresSoloGroup}`)
            // Book the kid to the group
            slot.scheduledStudents.push(student);

            if(slot.scheduledStudents.length == mandate.groupLimit) {
              slot.groupIsBooked = true;
            }

            // Satisfy one of the kid's requirements
            mandate.scheduled = true;

            // Prevent duplicate booking
            hasAlreadyScheduledASlot = true;
          }
        });
    }
  }); // End of studentsInCurrentCollege forEach
}); // End of timeslot loop

str(timeslots.filter(slot => slot.scheduledStudents.length > 0 ));
// str(studentList)


