import View, { EVENT_TYPE } from './View.js';
import Template from './Template.js';
import { qs, delegate } from '../helpers.js';

export default class KeywordListView extends View {
  constructor() {
    super(qs('#keyword-list-view'));

    this.template = new _Template();
    this.bindEvent();
  }

  bindEvent = () => {
    delegate(this.element, 'click', 'li', this.handleClick);
  }

  handleClick = ({ target: { dataset: { keyword } } }) => {
    const payload = { data: keyword };
    this.emit(EVENT_TYPE.MOVE, payload);
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
    super('list');
  }

  _getItem = ({ id, keyword }) => (
    `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li>
    `
  );
}


