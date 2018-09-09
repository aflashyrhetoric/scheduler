export default class Time {
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
