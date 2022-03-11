import View from './View.js';
import { qs } from '../helpers.js';

export default class SearchFormView extends View {
  constructor() {
    super(qs('#search-form-view'));

    debugger

    this.resetElement = qs('[type=reset]', this.element);
    this.showResetButton(false);

    debugger
  }

  showResetButton = (visible = true) => {
    this.resetElement.style.display = visible ? 'block' : 'none';
  }
}