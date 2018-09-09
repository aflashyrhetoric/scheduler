import Time from "./Time";
import { TimeSlot } from "./timeslots";

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

  let scheduleTemplate = `Time`;
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
      scheduleTemplate = addColumn(scheduleTemplate, dayRow[row]);
      scheduleTemplate = closeRow(scheduleTemplate)
    }

    // scheduleTemplate = addColumn(scheduleTemplate, dayRow[row]);
    // scheduleTemplate = closeRow(scheduleTemplate)

    // for (let column = 0; column < dayRow.length; column++) {
    //   let dayColumn = dayRow[column];

      // scheduleTemplate = addColumn(scheduleTemplate, dayRow);
      // scheduleTemplate = closeRow(scheduleTemplate)
    // }
  }

  console.log(scheduleTemplate)
}

function addColumn(template, text) {
  return template += `| ${text}`
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
