'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('start');

var updateBoard = function updateBoard(score) {
  var $new = (0, _jquery2.default)('.frame li:last').clone();
  $new.find('.badge').text(score);
  $new.find('.label').removeClass('label-primary');
  $new.find('.label').addClass('label-default');
  $new.find('.label').text('Frame Score');
  (0, _jquery2.default)('.frame').append($new);
};

var updateTotalScore = function updateTotalScore(score) {
  var $first = (0, _jquery2.default)('.frame li:first');
  $first.find('.badge').text(score);
};

var form = (0, _jquery2.default)("#addFrameBtn");
var rolls$ = _Rx2.default.Observable.fromEvent(form, 'submit').do(function (e) {
  return e.preventDefault();
}).map(function (_) {
  return parseInt(form.find('#roll1').val()) + parseInt(form.find('#roll2').val());
});

rolls$.subscribe(updateBoard);

var endGame$ = rolls$.scan(function (x, y) {
  return x + y;
}, 0).subscribe(updateTotalScore);