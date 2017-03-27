import Rx from 'rxjs/Rx';
import $ from 'jquery'

console.log('start');

const updateBoard = score => {
  const $new = $('.frames li:last').clone();
  $new.find('.score').text(score);
  $new.attr('data-index', parseInt($new.attr('data-index')) + 1);
  $('.frames').append($new);
}

const updateBonus = ({index, bonus}) => {
  console.log(index, bonus, 'bonus');
  const $first = $('*[data-index="' + (index) + '"]');
  $first.find('.bonus').text(bonus)
}

const form = $("#addFrameBtn");
const rolls$ = Rx.Observable.fromEvent(form, 'submit')
  .do(e => e.preventDefault())
  .map(e => ({roll1: parseInt(form.find('#roll1').val()), roll2: parseInt(form.find('#roll2').val())}))

const final$ = new Rx.Subject()
  .subscribe(updateBonus);

const bonus$ = rolls$.scan((acc, {roll1, roll2}, index) => {
    const isStrike = (roll1 === 10);
    const isSpare = (roll1 !== 10 && (roll1 + roll2) === 10);
    if (isStrike) acc.push({index, rolls:2, type: 'strike',  bonus:0});
    else if (isSpare) acc.push({index, rolls:1, type: 'spare',  bonus:0})
    else final$.next({index, rolls:0, type: 'blank', bonus: 0})

    acc.forEach((element, accIndex) => {
      if (element.index === index) return;
      if (element.rolls === 0) {
        final$.next(element);
        delete acc[accIndex];
        return;
      }
      if (isStrike || element.rolls === 1) {
        element.bonus += roll1;
        element.rolls -= 1;
        return;
      }
      element.rolls = 0;
      element.bonus += roll1 + roll2
    })

    return acc;
}, []);

bonus$.subscribe();


const rollsSum$ = rolls$
  .map((({roll1, roll2}) => roll1 + roll2))
  .subscribe(updateBoard);
