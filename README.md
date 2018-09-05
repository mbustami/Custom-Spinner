# My Custom Spinner

![alt text](https://github.com/mbustami/Custom-Spinner/blob/master/custom-spinner.png)

* A reusable Spinner component that's used as a progress indicator.
* It was used and tested as a files uploading progress indicator, also as a timer progress indicator.

## Tools used to build this component: 
- Vanilla Javascript (ES2015)
- Webpack for bundling
- babel
- Jasmine and Karma for testing
- some other useful loaders, like an html-loader, css-loader ...




In this project you will find:
* a 'src' folder that contains the component folder and the index.js file.
* a 'tests' folder for the tests.
* a 'dist' folder that contains index.html file alongside the .js files that will be generated when you build the project


## Setup
```
npm install
```

## Build
```
npm run build
```

## Tests
```
npm test
```


## How to use this component

* To use this component, you will need to first import it in your .js file
```
import Spinner from './Spinner/Spinner';
```

* after that you will need to instantiate an Object from the Spinner Class and provide a valid DOM element's ID as a parameter so the spinner could be rendered inside that element.
```
const spinner = new Spinner("spinner-wrapper");
```

* Then as a consumer of this component, you should add the mathematical equation according to which the circle's stroke-dashoffset property will be decreased.
In other words you should provide how much of the circle will be filled after each round of your process.

## Important Notes
As a reusable component, the equation that will determine how much of the circle will be filled after each round of the process must be provided by the consumer of the component,
as each consumer might use the spinner differently (to indicate different progress behaviors).

for example in the example below the Spinner is being used as a timer indicator:

```
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
```

so in this case the spinner should work according this equation:
initialOffset-(i*(initialOffset/completedAt));


Another example, here the Spinner component is used to indicate files uploading progress

```
var percent = (event.loaded / event.total) * 100;

var initialOffset = spinner.getInitialOffset();
spinner.setOffset(initialOffset - ((percent/100) * initialOffset));
```

## The main APIs for the consumers of this component:

```
- getInitialOffset()
```
What do we mean by the InitialOffset, is the stroke-dashoffset property of the spinner's circle,
which is the pixel circumference of the circle.

It's set statically to 440, as our circle has a radius of 70.
So Math.ceil(r * 2 * Math.PI) will result in 440 in our case

so this method will return the InitialOffset to the consumer;

```
- setOffset()
```
This method is used to set the percentage of the circle that should be filled each round.
(how much of the InitialOffset will be decreased each round).

```
- setStatus()
```
This method can be used to set the status, which is the number in the center of the circle,

for example in the files uploader example above, this method could be used like this:
```
spinner.setStatus(percent);
```

## Tests

I've included some tests in the 'spinner.spec.js' file,
and the last test will act as a consumer component that will use the spinner to inticate a timer progress,
so it will test that after the timer is done, the circle is completely filled.


## Final Note

Please note that I've added a second implementation for this Custom Spinner following the WebComponents approach.

https://github.com/mbustami/Custom-Spinner-2