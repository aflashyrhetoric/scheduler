import Time from "./Time";
import { TimeSlot } from "./timeslots";

export function printUnsatisfiedMandates(studentList) {
  // Filter out students who have any unsatisfied mandates at all
  let students = studentList.filter(student => !student.mandates.every(mandate => mandate.scheduled))

  // Filter out satisfied mandates, leaving only unsatisfied
  students.forEach(student => {
    student.mandates = student.mandates.filter(mandate => !mandate.scheduled)
    let studentMandateTemplate = ``
    student.mandates.forEach(mandate => studentMandateTemplate += `${mandate.groupLimit}x30, `)
    student.mandates = studentMandateTemplate.slice(0, studentMandateTemplate.length - 2)
  })

  let scheduleTemplate = "## Students with unsatisfied mandates\n"
  scheduleTemplate += `|Student|College|Mandates`;
  scheduleTemplate = closeRow(scheduleTemplate);
  scheduleTemplate += "|---|---|---|---";
  scheduleTemplate = closeRow(scheduleTemplate);

  students.forEach(student => {
    scheduleTemplate+= `|${student.name}|${student.college}|${student.mandates}`
    scheduleTemplate = closeRow(scheduleTemplate);
  })

  console.log(scheduleTemplate)
}
export function printMarkdownSchedule(timeslots) {
  /* 
   * Preparation
   */
  let allSlots = TimeSlot.allSlots();
  let uniqueDays = timeslots.reduce((days, slot) => {
    if (!days.includes(slot.day)) {
      days.push(slot.day);
    }
    return days;
  }, []);

  // An array of each day's slots, starting with the template "8 - 9AM" 
  let uniqueDayTimeSlots = []
  uniqueDayTimeSlots.push(allSlots)

  uniqueDays.forEach( day => {
    let dailySchedule = timeslots.filter( slot => {
      return day === slot.day 
    })
    uniqueDayTimeSlots.push(dailySchedule)
  })

  /* 
   * Set up the template heading in Markdown
   */

  let scheduleTemplate = "## Tentative Schedule\n"
  scheduleTemplate += `Time`;
  // Add days to template
  uniqueDays.forEach(day => {
    scheduleTemplate += `|${day}`;
  });
  scheduleTemplate = closeRow(scheduleTemplate);
  scheduleTemplate += "|---";
  uniqueDays.forEach(day => {
    scheduleTemplate += "|---";
  });
  scheduleTemplate = closeRow(scheduleTemplate);


  /* 
   * Logic for populating the template
   */

  // uniqueDayTimeSlots.forEach(row => {
  //   scheduleTemplate = addColumn(scheduleTemplate, dayRow[row]);
  //   scheduleTemplate = closeRow(scheduleTemplate)
  // })

  for (let row = 0; row < allSlots.length; row++) {
    // let dayRow = uniqueDayTimeSlots[row];

    for( let column = 0; column < uniqueDayTimeSlots.length; column ++) {
      let studentTextTemplate;
      let areScheduledStudents = uniqueDayTimeSlots[column][row].scheduledStudents;
      if(areScheduledStudents) {
        let studentNames = uniqueDayTimeSlots[column][row].scheduledStudents.map(student => student.name)
        studentTextTemplate = `${studentNames.join(', ')}`;
      }

      let columnText = areScheduledStudents ? studentTextTemplate : uniqueDayTimeSlots[column][row]

      if(columnText == '') {
        columnText = 'No Students Available'
      }

      scheduleTemplate = addColumn(scheduleTemplate, columnText ? columnText : uniqueDayTimeSlots[column][row]);
    }

    scheduleTemplate = closeRow(scheduleTemplate)
  }

  console.log(scheduleTemplate)
  // str(uniqueDayTimeSlots[1][1])
}

function addColumn(template, text) {
  return template += `| ${text} `
}
function closeRow(template) {
  return template += `|\n`
}














export function strf(obj) {
  return JSON.stringify(obj, null, 2);
}

export function str(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

export function getEndTime(startTime, duration) {
  let newTime = {};
  let remainder = (startTime.minutes + duration) % 60;

  if (startTime.minutes + duration >= 60) {
    newTime = new Time(startTime.hours + 1, remainder);
  } else {
    newTime = new Time(startTime.hours, startTime.minutes + remainder);
  }
  return newTime;
}

export function pp(time) {
  let AMPM = time.hours < 12 ? "AM" : "PM";
  let displayHours = time.hours > 12 ? time.hours % 12 : time.hours;
  if (time.minutes == 0) {
    time.minutes = "00";
  }
  return `${displayHours}:${time.minutes}${AMPM}`;
}

export function flatten(arr1) {
  return arr1.reduce((acc, val) => acc.concat(val), []);
}

// Given a list of courses at a given time slot, prints it
export function printClassOverview(allCurrentCourses, slot) {
  if (allCurrentCourses.length > 0) {
    const courseName = allCurrentCourses.map(
      course =>
        `${course.courses.map(course => course.name)} (${course.college})`
    );
    console.log(`The courses that fit in the ${slot} are ${courseName}`);
  } else {
    console.log(`There are no courses at ${slot} that you can sit in on.`);
  }
}
