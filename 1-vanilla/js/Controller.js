import { EVENT_TYPE } from './views/SearchFormView.js';

export default class Controller {
  constructor(store, { searchFormView, searchResultView }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents = () => {
    this.searchFormView
      .on(EVENT_TYPE.SUBMIT, this.search)
      .on(EVENT_TYPE.CLEAR, this.clear);

  }

  search = ({ detail: { value } }) => {
    this.store.search(value);
    this.render();
  }

  clear = (e) => {
  }

  render = () => {
    if (this.store.searchKeyword.length > 0) {
      this.searchResultView.show(this.store.searchResult);
      return;
    }

    this.searchResultView.hide();
  }
}
