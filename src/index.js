import Spinner from './Spinner/Spinner';

var spinner = new Spinner("spinnerWrapper");

function timeSpinner() {  
  var i = 1;
  var completedAt = 10;
  var interval = setInterval(() => {

    var initialOffset = spinner.getInitialOffset();
    spinner.setOffset(initialOffset-(i*(initialOffset/completedAt)));
    spinner.setStatus(i);

    if (i == completedAt) {
        clearInterval(interval);
    }
    i++;  
  }, 1000);
}

timeSpinner();
