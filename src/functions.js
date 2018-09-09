// LOL
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
