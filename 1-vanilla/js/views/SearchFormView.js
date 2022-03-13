import View from './View.js';
import { qs, on } from '../helpers.js';

const SUBMIT = '@submit';
const CLEAR = '@clear';

export const EVENT_TYPE = {
  SUBMIT,
  CLEAR
}

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
      this.clearEvent();
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
    this.clearEvent();
  }

  clearEvent = (isClear = true) => this.emit(EVENT_TYPE.CLEAR, { value: isClear });
}