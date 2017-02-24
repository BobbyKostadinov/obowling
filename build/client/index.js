'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('start');

var btn = document.getElementById("addFrameBtn");
var rolls$ = _Rx2.default.Observable.fromEvent(btn, 'click').do(function (e) {
  return e.preventDefault();
}).subscribe(function (x) {
  console.log('Submit: Clicked!');
}, function (err) {
  console.log('Error: %s', err);
}, function () {
  console.log('Completed');
});