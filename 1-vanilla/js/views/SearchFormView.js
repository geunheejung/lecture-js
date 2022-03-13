import View, { EVENT_TYPE } from './View.js';
import { qs, on } from '../helpers.js';

export default class SearchFormView extends View {
  constructor() {
    super(qs('#search-form-view'));

    this.inputElement = qs('[type=text]', this.element);
    this.resetElement = qs('[type=reset]', this.element);

    this.showResetButton(false);
    this.bindEvent(); // view가 생성 -> event 바인딩.
  }

  showResetButton = (visible = true) => {
    this.resetElement.style.display = visible ? 'block' : 'none';
  }

  bindEvent = () => {
    on(this.inputElement, 'keyup', this.handleKeyUp);
    on(this.resetElement, 'click', this.handleReset)
    this.on('submit', this.handleSubmit);
  }

  handleKeyUp = (e) => {
    const { value } = e.currentTarget;
    const { style } = this.resetElement;

    if (style.display === 'none' && value.length > 0) this.showResetButton();
    if (style.display === 'block' && !value.length) {
      this.showResetButton(false);
      this.resetEvent();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { value } = this.inputElement;
    const payload = {
      value,
    }

    this.emit(EVENT_TYPE.SUBMIT, payload);
  }

  handleReset = () => {
    this.resetEvent();
  }

  resetEvent = (isReset = true) => this.emit(EVENT_TYPE.RESET, { value: isReset });
}