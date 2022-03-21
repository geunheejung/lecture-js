import View from './View.js';

import { qs } from '../helpers.js';
import Template from './Template.js';

export default class SearchResultView extends View {
  constructor() {
    super(qs('#search-result-view'));

    this.template = new _Template();
  }

  show(data = []) {
    this.element.innerHTML = data.length > 0
      ? this.template.getList(data)
      : this.template.getEmptyMessage();
    super.show();
  }
}

class _Template extends Template{
  constructor() {
    super('result');
  }

  _getItem = ({ name, imageUrl }) => (
    `
      <li>
        <img src="${imageUrl}" alt="${name}">
        <p>${name}</p>
      </li>
    `
  )}
