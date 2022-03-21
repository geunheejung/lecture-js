import KeywordListView from './KeywordListView.js';
import { qs, formatRelativeDate, delegate } from '../helpers.js';
import Template from './Template.js';
import { EVENT_TYPE } from './View.js';

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(
      qs('#history-list-view'),
      new _Template(),
    );

    this.bindEvent();
  }

  bindEvent = () => {
    delegate(this.element, 'click', '.btn-remove', this.handleRemove);
  }

  handleRemove = ({ target: { parentNode } }) => {
    /*
    * 1. 버튼을 클릭한다.
    * 2. 해당 인덱스를  구한다.
    * 3. store에서 해당 인덱스에 해당하는 최근 검색어를 삭제한다.
    * */
    this.emit(EVENT_TYPE.REMOVE, parentNode.dataset.id);
  }
}

class _Template extends Template {
  constructor() {
    super();
  }

  _getItem = ({ id, keyword, date }) => {
    return `
      <li 
        data-keyword="${keyword}"
        data-id="${id}"
      >
        <span class="number">${id}</span>
        ${keyword}
        <span class="date">${formatRelativeDate(date)}</span>
        <button class="btn-remove"></button>
      </li>
    `
  }
}