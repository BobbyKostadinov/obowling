import Rx from 'rxjs/Rx';
import $ from 'jquery'

console.log('start');

const updateBoard = score => {
  const $new = $('.frame li:last').clone();
  $new.find('.badge').text(score)
  $new.find('.label').removeClass('label-primary');
  $new.find('.label').addClass('label-default');
  $new.find('.label').text('Frame Score');
  $('.frame').append($new);
}

const updateTotalScore = score => {
  const $first = $('.frame li:first');
  $first.find('.badge').text(score)
}


const form = $("#addFrameBtn");
const rolls$ = Rx.Observable.fromEvent(form, 'submit')
  .do(e => e.preventDefault())
  .map(_ =>
    parseInt(form.find('#roll1').val()) + parseInt(form.find('#roll2').val())
  );


  rolls$.subscribe(updateBoard);

  const endGame$ = rolls$.scan((x, y) => x + y, 0)
    .subscribe(updateTotalScore)
