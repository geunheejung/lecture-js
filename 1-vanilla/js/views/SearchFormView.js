import View from './View.js';
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
    on(this.inputElement, 'keyup', () => this.handleKeyUp());
    this.on('submit', event => this.handleSubmit(event));
  }

  handleKeyUp = () => {
    const { value } = this.inputElement;
    const { style } = this.resetElement;

    if (style.display === 'none' && value.length > 0) this.showResetButton();
    if (!value.length) this.showResetButton(false);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.inputElement;
    const payload = {
      value
    }

    this.emit(`@submit`, payload);
  }
}