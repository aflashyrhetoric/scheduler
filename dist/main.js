/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/*! exports provided: strf, str, getEndTime, pp, flatten, printClassOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"strf\", function() { return strf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"str\", function() { return str; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getEndTime\", function() { return getEndTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pp\", function() { return pp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flatten\", function() { return flatten; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"printClassOverview\", function() { return printClassOverview; });\n// LOL\nfunction strf(obj) {\n  return JSON.stringify(obj, null, 2);\n}\nfunction str(obj) {\n  console.log(JSON.stringify(obj, null, 2));\n}\nfunction getEndTime(startTime, duration) {\n  var newTime = {};\n  var remainder = (startTime.minutes + duration) % 60;\n\n  if (startTime.minutes + duration >= 60) {\n    newTime = new Time(startTime.hours + 1, remainder);\n  } else {\n    newTime = new Time(startTime.hours, startTime.minutes + remainder);\n  }\n\n  return newTime;\n}\nfunction pp(time) {\n  var AMPM = time.hours < 12 ? \"AM\" : \"PM\";\n  var displayHours = time.hours > 12 ? time.hours % 12 : time.hours;\n\n  if (time.minutes == 0) {\n    time.minutes = \"00\";\n  }\n\n  return \"\".concat(displayHours, \":\").concat(time.minutes).concat(AMPM);\n}\nfunction flatten(arr1) {\n  return arr1.reduce(function (acc, val) {\n    return acc.concat(val);\n  }, []);\n} // Given a list of courses at a given time slot, prints it\n\nfunction printClassOverview(allCurrentCourses, slot) {\n  if (allCurrentCourses.length > 0) {\n    var courseName = allCurrentCourses.map(function (course) {\n      return \"\".concat(course.courses.map(function (course) {\n        return course.name;\n      }), \" (\").concat(course.college, \")\");\n    });\n    console.log(\"The courses that fit in the \".concat(slot, \" are \").concat(courseName));\n  } else {\n    console.log(\"There are no courses at \".concat(slot, \" that you can sit in on.\"));\n  }\n}\n\n//# sourceURL=webpack:///./src/functions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _students__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./students */ \"./src/students.json\");\nvar _students__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./students */ \"./src/students.json\", 1);\n/* harmony import */ var _timeslots__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeslots */ \"./src/timeslots.js\");\n/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions */ \"./src/functions.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar studentList = _students__WEBPACK_IMPORTED_MODULE_0__.students;\nvar colleges = [];\nvar HOUR = 60;\n\nvar Time =\n/*#__PURE__*/\nfunction () {\n  function Time(hours, minutes) {\n    _classCallCheck(this, Time);\n\n    this.hours = hours;\n    this.minutes = minutes;\n  }\n\n  _createClass(Time, [{\n    key: \"convertToSeconds\",\n    value: function convertToSeconds() {\n      var seconds = 0;\n      seconds += this.hours * 60\n      /* minutes */\n      * 60;\n      /* seconds */\n\n      seconds += this.minutes * 60;\n      /* seconds */\n\n      return seconds;\n    }\n  }]);\n\n  return Time;\n}();\n\nArray.prototype.shuffle = function () {\n  var input = this;\n\n  for (var i = input.length - 1; i >= 0; i--) {\n    var randomIndex = Math.floor(Math.random() * (i + 1));\n    var itemAtIndex = input[randomIndex];\n    input[randomIndex] = input[i];\n    input[i] = itemAtIndex;\n  }\n\n  return input;\n};\n\nvar Course =\n/*#__PURE__*/\nfunction () {\n  function Course(name, startHour, startMinute, duration) {\n    _classCallCheck(this, Course);\n\n    this.name = name;\n    this.startTime = new Time(startHour, startMinute);\n    this.duration = duration;\n    this.endTime = Object(_functions__WEBPACK_IMPORTED_MODULE_2__[\"getEndTime\"])(this.startTime, this.duration);\n  }\n\n  _createClass(Course, [{\n    key: \"fitsIn\",\n    value: function fitsIn(timeSlot) {\n      var timeSlotStart = timeSlot.startTime.convertToSeconds();\n      var timeSlotEnd = timeSlot.endTime.convertToSeconds();\n      var startTimeInSeconds = this.startTime.convertToSeconds();\n      var endTimeInSeconds = this.endTime.convertToSeconds();\n      return timeSlotStart >= startTimeInSeconds && timeSlotEnd <= endTimeInSeconds;\n    }\n  }]);\n\n  return Course;\n}();\n\nvar Wheatley =\n/*#__PURE__*/\nfunction (_Course) {\n  _inherits(Wheatley, _Course);\n\n  function Wheatley(startHour, startMinute) {\n    _classCallCheck(this, Wheatley);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Wheatley).call(this, \"Wheatley\", startHour, startMinute, 50));\n  }\n\n  return Wheatley;\n}(Course);\n\nvar Reading =\n/*#__PURE__*/\nfunction (_Course2) {\n  _inherits(Reading, _Course2);\n\n  function Reading(startHour, startMinute) {\n    _classCallCheck(this, Reading);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Reading).call(this, \"Reading\", startHour, startMinute, 60));\n  }\n\n  return Reading;\n}(Course);\n\nvar Writing =\n/*#__PURE__*/\nfunction (_Course3) {\n  _inherits(Writing, _Course3);\n\n  function Writing(startHour, startMinute) {\n    _classCallCheck(this, Writing);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Writing).call(this, \"Writing\", startHour, startMinute, 45));\n  }\n\n  return Writing;\n}(Course);\n\nvar SharedText =\n/*#__PURE__*/\nfunction (_Course4) {\n  _inherits(SharedText, _Course4);\n\n  function SharedText(startHour, startMinute) {\n    _classCallCheck(this, SharedText);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(SharedText).call(this, \"SharedText\", startHour, startMinute, 25));\n  }\n\n  return SharedText;\n}(Course);\n\nvar Hampton = {\n  name: \"Hampton\",\n  courses: [new Wheatley(8, 10), new Reading(11, 0), new Writing(12, 0), new SharedText(14, 15)]\n};\nvar Pittsburgh = Object.assign({}, Hampton);\nPittsburgh.name = \"Pittsburgh\";\nvar Temple = Object.assign({}, Hampton);\nTemple.name = \"Temple\";\nvar Maryland = {\n  name: \"Maryland\",\n  courses: [new Writing(8, 55), new Reading(11, 0), new SharedText(12, 2, 30), new Wheatley(13, 15)]\n};\nvar USC = {\n  name: \"USC\",\n  courses: [new Writing(8, 2, 50), new Wheatley(8, 55), new SharedText(9, 47, 30), new Reading(11, 0)]\n};\nvar Albany = {\n  name: \"Albany\",\n  courses: [new Wheatley(8, 2), new Reading(11, 0), new Writing(1, 15, 50), new SharedText(15, 5, 30)]\n}; // 6 schools with 4 courses each\n\ncolleges.push(Hampton, Pittsburgh, Temple, Maryland, USC, Albany); // Shuffle colleges to remove bias a bit\n// colleges.shuffle();\n// Add kids to colleges\n\ncolleges.forEach(function (college) {\n  college.members = [];\n  studentList.forEach(function (student) {\n    if (college.name == student.college) {\n      college.members.push(student);\n    }\n  });\n});\n/*\n * Get all courses \n */\n// college - courses join\n\nvar collegeCourseMap = colleges.map(function (college) {\n  return {\n    name: college.name,\n    courses: college.courses\n  };\n}); // For each time slot,\n\n_timeslots__WEBPACK_IMPORTED_MODULE_1__[\"default\"].forEach(function (slot) {\n  var allCurrentCourses = [];\n  var maxGroupSize;\n  var studentsInCurrentCollege = [];\n  var currentCollegeCourses = [];\n  slot.groupIsBooked = false;\n  slot.scheduledStudents = []; // Find the current courses\n\n  collegeCourseMap.forEach(function (college) {\n    var _currentCollegeCourse;\n\n    currentCollegeCourses = (_currentCollegeCourse = currentCollegeCourses).concat.apply(_currentCollegeCourse, _toConsumableArray(college.courses.filter(function (college) {\n      return college.fitsIn(slot);\n    }))); // If there are any classes, add them\n\n    if (currentCollegeCourses.length > 0) {\n      allCurrentCourses = allCurrentCourses.concat({\n        college: college.name,\n        courses: currentCollegeCourses\n      });\n    }\n  }); // 8:00AM - 9:00AM - [ CLASSES ]\n  // console.log(`${slot.toString()} - ${strf(allCurrentCourses)}`);\n  // For each college, find available kids\n\n  allCurrentCourses.forEach(function (course) {\n    var _studentsInCurrentCol;\n\n    // Kids in this college\n    studentsInCurrentCollege = (_studentsInCurrentCol = studentsInCurrentCollege).concat.apply(_studentsInCurrentCol, _toConsumableArray(studentList.filter(function (student) {\n      return student.college == course.college;\n    })));\n  }); // str(studentsInCurrentCollege)\n  // For each college kid, assign roles\n\n  studentsInCurrentCollege.forEach(function (student) {\n    var hasAlreadyScheduledASlot = false;\n    var currentGroupSize = slot.scheduledStudents.length;\n    var studentIsNotFullyScheduled = student.mandates.filter(function (mandate) {\n      return mandate.scheduled;\n    }).length === 0;\n    var studentRequiresSoloGroup = student.mandates.filter(function (mandate) {\n      return mandate.groupLimit == 1;\n    }).length > 0; // console.log(`${student.name} - ${!student.mandates.filter(mandate => mandate.scheduled).length === 0}`)\n\n    /* \n     * FOR SOLO SESSIONS\n     */\n\n    if (currentGroupSize == 0 && studentRequiresSoloGroup && studentIsNotFullyScheduled && !hasAlreadyScheduledASlot) {\n      // ...book it!\n      student.mandates.filter(function (mandate) {\n        return !mandate.scheduled;\n      }).filter(function (mandate) {\n        return mandate.groupLimit === 1;\n      }).forEach(function (mandate) {\n        // Book the kid to the group\n        slot.scheduledStudents.push(student); // Satisfy one of the kid's requirements\n\n        mandate.scheduled = true; // Prevent duplicate booking\n\n        hasAlreadyScheduledASlot = true;\n        slot.groupIsBooked = true;\n      });\n    }\n    /* \n     * FOR BOOKING GROUP SESSIONS\n     */\n\n\n    if (studentIsNotFullyScheduled && !hasAlreadyScheduledASlot && !slot.groupIsBooked) {\n      // console.log(`${student.name}`)\n      maxGroupSize = Math.min.apply(Math, _toConsumableArray(Object(_functions__WEBPACK_IMPORTED_MODULE_2__[\"flatten\"])(studentsInCurrentCollege.map(function (student) {\n        return student.mandates.map(function (mandate) {\n          return mandate.groupLimit;\n        });\n      })))); // Filter through GROUP mandates, mark an appropriate one\n\n      student.mandates.filter(function (mandate) {\n        return !mandate.scheduled;\n      }).filter(function (mandate) {\n        return mandate.groupLimit > 1;\n      }).forEach(function (mandate) {\n        // Check that it's the right one\n        if (currentGroupSize + 1 <= mandate.groupLimit && // currentGroupSize + 1 <= maxGroupSize &&\n        !hasAlreadyScheduledASlot) {\n          // console.log(`${student.name} - ${studentRequiresSoloGroup}`)\n          // Book the kid to the group\n          slot.scheduledStudents.push(student);\n\n          if (slot.scheduledStudents.length == mandate.groupLimit) {\n            slot.groupIsBooked = true;\n          } // Satisfy one of the kid's requirements\n\n\n          mandate.scheduled = true; // Prevent duplicate booking\n\n          hasAlreadyScheduledASlot = true;\n        }\n      });\n    }\n  }); // End of studentsInCurrentCollege forEach\n}); // End of timeslot loop\n\nObject(_functions__WEBPACK_IMPORTED_MODULE_2__[\"str\"])(_timeslots__WEBPACK_IMPORTED_MODULE_1__[\"default\"].filter(function (slot) {\n  return slot.scheduledStudents.length > 0;\n})); // str(studentList)\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/students.json":
/*!***************************!*\
  !*** ./src/students.json ***!
  \***************************/
/*! exports provided: students, default */
/***/ (function(module) {

eval("module.exports = {\"students\":[{\"name\":\"Rivah Church\",\"college\":\"USC\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Salia Fofana\",\"college\":\"Lehman\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Jacob Hernandez\",\"college\":\"Hampton\",\"mandates\":[{\"groupLimit\":1,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Heaven Rivera\",\"college\":\"Hampton\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Jose Navarrete\",\"college\":\"Temple\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Dallas Wiggins\",\"college\":\"Pittsburgh\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Fraymer Estrella\",\"college\":\"Hampton\",\"mandates\":[{\"groupLimit\":3,\"scheduled\":false},{\"groupLimit\":3,\"scheduled\":false}]},{\"name\":\"Hamani Adam\",\"college\":\"Maryland\",\"mandates\":[{\"groupLimit\":1,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Shawn Bradberry\",\"college\":\"USC\",\"mandates\":[{\"groupLimit\":1,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Coleman Brown\",\"college\":\"Albany\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Ja'miya Brown\",\"college\":\"Albany\",\"mandates\":[{\"groupLimit\":3,\"scheduled\":false},{\"groupLimit\":3,\"scheduled\":false}]},{\"name\":\"Jordan Djomambo\",\"college\":\"Albany\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Christian Fraser\",\"college\":\"USC\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Luis Garcia\",\"college\":\"Maryland\",\"mandates\":[{\"groupLimit\":1,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Kajohn Grandison\",\"college\":\"USC\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false},{\"groupLimit\":2,\"scheduled\":false}]},{\"name\":\"Andrew Hood\",\"college\":\"USC\",\"mandates\":[{\"groupLimit\":2,\"scheduled\":false}]}]};\n\n//# sourceURL=webpack:///./src/students.json?");

/***/ }),

/***/ "./src/timeslots.js":
/*!**************************!*\
  !*** ./src/timeslots.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Time =\n/*#__PURE__*/\nfunction () {\n  function Time(hours, minutes) {\n    _classCallCheck(this, Time);\n\n    this.hours = hours;\n    this.minutes = minutes;\n  }\n\n  _createClass(Time, [{\n    key: \"convertToSeconds\",\n    value: function convertToSeconds() {\n      var seconds = 0;\n      seconds += this.hours * 60\n      /* minutes */\n      * 60\n      /* seconds */\n      ;\n      seconds += this.minutes * 60\n      /* seconds */\n      ;\n      return seconds;\n    }\n  }]);\n\n  return Time;\n}();\n\nfunction pp(time) {\n  var AMPM = time.hours < 12 ? 'AM' : 'PM';\n  var displayHours = time.hours > 12 ? time.hours % 12 : time.hours;\n\n  if (time.minutes == 0) {\n    time.minutes = '00';\n  }\n\n  return \"\".concat(displayHours, \":\").concat(time.minutes).concat(AMPM);\n}\n\nvar TimeSlot = function TimeSlot(day, startHour, startMinute) {\n  _classCallCheck(this, TimeSlot);\n\n  this.day = day;\n  this.startTime = new Time(startHour, startMinute);\n\n  if (startMinute + 30 >= 60) {\n    this.endTime = new Time(startHour + 1, (startMinute + 30) % 60);\n  } else {\n    this.endTime = new Time(startHour, startMinute + 30);\n  }\n\n  this.toString = function () {\n    return \"\".concat(pp(this.startTime), \" - \").concat(pp(this.endTime));\n  };\n};\n\nvar timeslots = [new TimeSlot('Thursday', 8, 0), new TimeSlot('Thursday', 8, 30), new TimeSlot('Thursday', 9, 0), new TimeSlot('Thursday', 9, 30), new TimeSlot('Thursday', 10, 0), new TimeSlot('Thursday', 10, 30), new TimeSlot('Thursday', 11, 0), new TimeSlot('Thursday', 11, 30), new TimeSlot('Thursday', 12, 0), new TimeSlot('Thursday', 12, 30), new TimeSlot('Thursday', 13, 0), new TimeSlot('Thursday', 13, 30), new TimeSlot('Thursday', 14, 0), new TimeSlot('Thursday', 14, 30), new TimeSlot('Thursday', 15, 0), new TimeSlot('Friday', 8, 0), new TimeSlot('Friday', 8, 30), new TimeSlot('Friday', 9, 0), new TimeSlot('Friday', 9, 30), new TimeSlot('Friday', 10, 0), new TimeSlot('Friday', 10, 30), new TimeSlot('Friday', 11, 0), new TimeSlot('Friday', 11, 30), new TimeSlot('Friday', 12, 0), new TimeSlot('Friday', 12, 30), new TimeSlot('Friday', 13, 0), new TimeSlot('Friday', 13, 30), new TimeSlot('Friday', 14, 0), new TimeSlot('Friday', 14, 30), new TimeSlot('Friday', 15, 0)];\n/* harmony default export */ __webpack_exports__[\"default\"] = (timeslots);\n\n//# sourceURL=webpack:///./src/timeslots.js?");

/***/ })

/******/ });