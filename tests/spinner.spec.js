import CustomSpinner from '../src/Spinner/Spinner';

let fragment = document.createElement('div');
    fragment.innerHTML = `
        <div id="wrapper"></div>
    `;
const spinner = new CustomSpinner('wrapper', fragment);
const spinnerTemplate = fragment.querySelector('.spinner');
const stopBtn = fragment.querySelector(".spinner__btn--stop");
const continueBtn = fragment.querySelector(".spinner__btn--continue");
const circleSvg = fragment.querySelector('.spinner__svg');

describe('CustomSpinner', () => {


    describe('CustomSpinner\'s istance', () => {
        it('should be defined as an Object', () => {
            expect( typeof spinner ).toBe('object');
        });
        it('should throw an error when given an element with a false id', () => {
            expect(() => {
                let spinner2 = new CustomSpinner('abc');
            }).toThrow(new Error("#abc does not exist"));
        });
        it('should render the component\'s html inside the given DOM element', () => {          
          expect(fragment.contains(spinnerTemplate)).toBe(true);
        })
    });

    describe('Spying on getters and setters', () => {
      it('should return 440 when getInitialOffset is called since the InitialOffset is statically set to 440', () => {
        let spy = spyOn(spinner, "getInitialOffset").and.callThrough();
        expect(spinner.getInitialOffset()).toEqual(440);
        expect(spy).toHaveBeenCalled();
      });
      it('should return the spinner\'s offset', () => {
        let spy = spyOn(spinner, "getOffset").and.returnValue(10);
        expect(spinner.getOffset()).toEqual(10);
      });
      it('should set the spinner\'s offset', () => {
        let spy = spyOn(spinner, "setOffset");
        spinner.setOffset();
        expect(spy).toHaveBeenCalled();
      });
      it('should set the spinner\'s status', () => {
        let spy = spyOn(spinner, "setStatus");
        spinner.setStatus();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('Stop Button', () => {
      it('should change the spinner\'s spin state to false', (done) => {
          stopBtn.addEventListener('click', () => {
              expect(spinner.spin).toBe(false);
              done();
          });
          stopBtn.dispatchEvent(new Event('click'));            
      });
      it('should change the continueBtn\'s styling to inline-block', (done) => {
          stopBtn.addEventListener('click', () => {
              expect(continueBtn.style.display).toBe('inline-block');                
              done();
          });
          stopBtn.dispatchEvent(new Event('click'));
      });
      it('should pause the svg animation', (done) => {
          stopBtn.addEventListener('click', () => {
              expect(circleSvg.style.animationPlayState).toBe('paused');
              done();
          });
          stopBtn.dispatchEvent(new Event('click'));            
      });
    });

    describe('Continue Button', () => {
        it('should change the spinner\'s spin state to true', (done) => {
            continueBtn.addEventListener('click', () => {
                expect(spinner.spin).toBe(true);
                done();
            });
            continueBtn.dispatchEvent(new Event('click'));            
        });        
        it('should continue running the svg animation', (done) => {
            continueBtn.addEventListener('click', () => {
                expect(circleSvg.style.animationPlayState).toBe('running');
                done();
            });
            continueBtn.dispatchEvent(new Event('click'));            
        });
    });


    // lastly, this is a real life scenario test 
    describe('CustomSpinner Circle\'s stroke-dashoffset', () => {
      var timerCallback;

      beforeEach(() => {
        timerCallback = jasmine.createSpy("timerCallback");
        jasmine.clock().install();
      });
      
      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it("should reach 0 eventually, if given the right mathematical equation according to which the circle\'s stroke-dashoffset will be decreased, for example after a time Interval clears out the circle should look complete, as the circle\'s stroke-dashoffset should be 0", () => {
        var i = 1;
        var completedAt = 5;
        var interval = setInterval(() => {
          var initialOffset = spinner.getInitialOffset();
          spinner.setOffset(initialOffset-(i*(initialOffset/completedAt)));  // the equation according to which the circle's stroke-dashoffset will decrease 
          if (i == completedAt) {
            clearInterval(interval);
          }
          i++;  
        }, 1000);
        jasmine.clock().tick(5001);
        expect(parseInt(spinner.getOffset())).toBe(0);        
      });
       
    });


});