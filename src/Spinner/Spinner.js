import './Spinner.css';
import template from './Spinner.html';
export default class CustomSpinner {

  constructor(el, context) {
    this.context = context || document;
    
    this.checkIfElementExists(el);
    this.render(el);
    this.initialOffset = 440; // The circumference of our circle which has a radius of 70; Math.ceil(r * 2 * Math.PI);
    this.circle = this.context.querySelector(".spinner__circle");
    this.circleSvg = this.context.querySelector('.spinner__svg');
    this.stopBtn = this.context.querySelector(".spinner__btn--stop");
    this.continueBtn = this.context.querySelector(".spinner__btn--continue");
    this.status = this.context.querySelector(".spinner__status");
    this.spin = true;
    this.eventListeners();
  }

  eventListeners() {
    this.stopBtn.addEventListener('click', () => this.stopSpinning());    
    this.continueBtn.addEventListener('click', () => this.continueSpinning());
  }

  // To check if the passed element exists in the DOM
  checkIfElementExists(el) {
    if (!this.context.querySelector('#'+el)) {
      throw new Error(`#${el} does not exist`);
    }
  }

  render(el) {     
    this.context.querySelector('#'+el).innerHTML = template;
  }
  
  stopSpinning() {
    this.spin = false;
    this.continueBtn.style.display = "inline-block";
    this.circleSvg.style.animationPlayState = 'paused';
  }

  continueSpinning() {
    this.spin = true;
    this.circleSvg.style.animationPlayState = 'running';
  }

  setOffset(val) {
    if (this.spin) {
      this.circle.style.strokeDashoffset = val;
    }
  }

  getOffset() {
    return this.circle.style.strokeDashoffset;
  }

  getInitialOffset() {
    return this.initialOffset;
  }

  setStatus(val) {
    this.status.innerHTML = val;
  }

}