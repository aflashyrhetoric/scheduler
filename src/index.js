import studentRoster from "./students-two";
import timeslots from "./timeslots";
import Time from './Time';
import {
  strf,
  str,
  getEndTime,
  pp,
  flatten,
  printClassOverview,
  printUnsatisfiedMandates,
  printMarkdownSchedule
} from "./functions";

let studentList = studentRoster.students;

studentList = studentList.concat(
  {
    "name": "Jayden Linton",
    "college": "FnM",
    "mandates": [
      {
        "groupLimit": 1,
        "scheduled": false,
      },
      {
        "groupLimit": 2,
        "scheduled": false,
      }
    ]
  },
  {
    "name": "Zachary Wilkins",
    "college": "FnM",
    "mandates": [
      {
        "groupLimit": 1,
        "scheduled": false,
      },
      {
        "groupLimit": 2,
        "scheduled": false,
      }
    ]
  }
)

let colleges = [];

Array.prototype.shuffle = function() {
  let input = this;

  for (let i = input.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = input[randomIndex];

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
      timeSlotStart >= startTimeInSeconds &&
      endTimeInSeconds >= timeSlotEnd
    );
  }
}

class Wheatley extends Course {
  constructor(startHour, startMinute, duration = 50) {
    super("Wheatley", startHour, startMinute, duration);
  }
}

class Reading extends Course {
  constructor(startHour, startMinute, duration = 60 ) {
    super("Reading", startHour, startMinute, duration);
  }
}

class ReadingMastery extends Course {
  constructor(startHour, startMinute, duration = 30 ) {
    super("ReadingMastery", startHour, startMinute, duration);
  }
}

class Writing extends Course {
  constructor(startHour, startMinute, duration = 45 ) {
    super("Writing", startHour, startMinute, duration);
  }
}

class SharedText extends Course {
  constructor(startHour, startMinute, duration = 25) {
    super("SharedText", startHour, startMinute, duration);
  }
}

class Lunch extends Course {
  constructor(startHour, startMinute, duration = 30) {
    super("Lunch", startHour, startMinute, duration);
  }
}


let Lehman = {
  name: "Lehman",
  courses: [
    new Wheatley(9, 0),
    new SharedText(9, 50),
    new Lunch(10, 15),
    new Reading(11, 0),
    new Writing(2, 25),
  ]
}

let FandM = {
  name: "FnM",
  courses: [
    new Wheatley(9, 25, 45),
    new Reading(11, 0),
    new ReadingMastery(12, 0),
    new Writing(1, 20, 40),
  ]
}

let Hampton = {
  name: "Hampton",
  courses: [
    new Wheatley(8, 10),
    // new Wheatley(8, 0),
    new Reading(11, 0),
    new Writing(12, 0),
    new SharedText(14, 10)
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
    new SharedText(12, 0, 30),
    new Wheatley(13, 15)
  ]
};
let USC = {
  name: "USC",
  courses: [
    new Writing(8, 0, 50),
    new Wheatley(8, 55),
    new SharedText(9, 45, 30),
    new Reading(11, 0)
  ]
};
let Albany = {
  name: "Albany",
  courses: [
    new Wheatley(8, 0),
    new Reading(11, 0),
    new Writing(13, 15, 50),
    new SharedText(15, 0, 30)
  ]
};

// 6 schools with 4 courses each
colleges.push(Lehman, FandM, Hampton, Pittsburgh, Temple, Maryland, USC, Albany);

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

let slotCount = 0
let currentDay = ''
let dailyRoster = []

// For each time slot,
timeslots.forEach(slot => {
  let currentCollegeCourseMap = [];
  let studentsInCurrentIterationCollege = [];
  let currentCollegeCourses = [];
  slot.groupIsBooked = false;
  slot.maxGroupSize;
  slot.scheduledStudents = [];

  // if it's a new day, reset currentDay and dailyRoster
  if(currentDay !== slot.day) {
    currentDay = slot.day
    dailyRoster = []
  } 

  // Find the current courses
  collegeCourseMap.forEach(college => {
    currentCollegeCourses = college.courses.filter(college => college.fitsIn(slot))

    // If there are any classes, add them
    if (currentCollegeCourses.length > 0) {
      currentCollegeCourseMap = currentCollegeCourseMap.concat({
        college: college.name,
        courses: currentCollegeCourses
      });
    }
    // if(slot.day === 'Friday') {
    //   console.log(slot.startTime)
    // }
  });

  // console.log(slot.startTime, currentCollegeCourseMap);

  // str(currentCollegeCourses)
  // console.log(`${slot.toString()}-${currentCollegeCourses}`)

  // 8:00AM - 9:00AM - [ CLASSES ]
  // console.log(`${slot.toString()} - ${strf(currentCollegeCourseMap)}`);

  // For each college, find available kids
  currentCollegeCourseMap.forEach(course => {
    // Kids in this college
    studentsInCurrentIterationCollege = studentsInCurrentIterationCollege.concat(
      ...studentList.filter(student => student.college == course.college)
    );
  });
  // console.log(`${slot.toString()}-${strf(currentCollegeCourseMap)}`)
  // console.log(studentsInCurrentIterationCollege.map(student => student.name))

  // For each college kid, assign roles
  studentsInCurrentIterationCollege.forEach(student => {
    let hasAlreadyScheduledASlot = false;
    let currentGroupSize = slot.scheduledStudents.length;
    let studentIsNotFullyScheduled =
      student.mandates.filter(mandate => mandate.scheduled).length >= 0;
    let studentRequiresSoloGroup =
      student.mandates.filter(mandate => mandate.groupLimit == 1).length > 0;
    let studentIsInSameSchoolAsAnyScheduledStudents = false;
    if(slot.scheduledStudents.length === 0) {
      // If no students, return true
      studentIsInSameSchoolAsAnyScheduledStudents = true;
    } else {
      studentIsInSameSchoolAsAnyScheduledStudents =
        slot.scheduledStudents.every(scheduledStudent => student.college === scheduledStudent.college)
    }


    // console.log(`${student.name} - ${!student.mandates.filter(mandate => mandate.scheduled).length === 0}`)

    /* 
     * FOR BOOKING GROUP SESSIONS
     */
    // console.log(`${student.name} booked? ${studentIsNotFullyScheduled}`)
    // console.log(slotCount);
    // console.log(`${student.name} - ${strf(student.mandates)}`)
    if (
      studentIsNotFullyScheduled &&
      studentIsInSameSchoolAsAnyScheduledStudents &&
      !hasAlreadyScheduledASlot &&
      !slot.groupIsBooked
    ) {

      slot.maxGroupSize = Math.min(
        ...flatten(
          studentsInCurrentIterationCollege.map(student =>
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
            currentGroupSize <= slot.maxGroupSize &&
            !dailyRoster.includes(student) &&
            !hasAlreadyScheduledASlot
          ) {
            // console.log(`${student.name} - ${studentRequiresSoloGroup}`)
            // Book the kid to the group
            slot.scheduledStudents.push(student);
            dailyRoster.push(student)

            if (slot.scheduledStudents.length == mandate.groupLimit) {
              slot.groupIsBooked = true;
            }

            // Satisfy one of the kid's requirements
            mandate.scheduled = true;

            // Prevent duplicate booking
            hasAlreadyScheduledASlot = true;
          // console.log(`${student.name} - ${strf(student.mandates)}`)
          }
          // console.log(mandate);
        });
    }

    /* 
     * FOR SOLO SESSIONS
     */
    if (
      currentGroupSize == 0 &&
      studentRequiresSoloGroup &&
      studentIsNotFullyScheduled &&
      !dailyRoster.includes(student) &&
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

  }); // End of studentsInCurrentIterationCollege forEach
  // if(slotCount === 0) {
  //   console.log(studentsInCurrentIterationCollege);
  // }
  slotCount++;
}); // End of timeslot loop

// str(timeslots.filter(slot => slot.scheduledStudents.length > 0 ));
printMarkdownSchedule(timeslots);
printUnsatisfiedMandates(studentList);
// str(timeslots)
// str(studentList)

