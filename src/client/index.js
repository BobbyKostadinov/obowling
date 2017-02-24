import Rx from 'rxjs/Rx';

console.log('start');

const btn = document.getElementById("addFrameBtn");
const rolls$ = Rx.Observable.fromEvent(btn, 'click')
  .do(e => e.preventDefault())
  .subscribe(
  function (x) {
      console.log('Submit: Clicked!');
    },
    function (err) {
      console.log('Error: %s', err);
    },
    function () {
      console.log('Completed');
  });
