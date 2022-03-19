import View from './View.js';
import { qs, formatRelativeDate } from '../helpers.js';

export default class SearchResultView extends View {
  constructor() {
    super(qs('#tab-result-view'));

    this.template = new Template();
  }

  show(data = []) {
    this.element.innerHTML = this.template.getList(data);

    super.show();
  }
}

class Template {
  getList = data => (
    `<ul class="list">${data.map(this._getItem)}</ul>`
  );

  _getItem = ({ id, keyword, date }) => {
    return `
      <li>
        <span class="number">${id}</span>
        <span>${keyword}</span>
        ${date ? `<span class="date">${formatRelativeDate(date)}</span>` : ''}
      </li>
    `
  }
}