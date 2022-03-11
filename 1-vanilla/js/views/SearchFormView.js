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
  }

  handleKeyUp = () => {
    const { value } = this.inputElement;
    const { style } = this.resetElement;
    // value의 길이가 0 -> 1 또는 1 -> 0 으로 바뀌는 순간에만
    // none인 상태이면서 value length가 존재할 경우
    if (style.display === 'none' && value.length > 0) this.showResetButton();
    if (!value.length) this.showResetButton(false);

  }
}