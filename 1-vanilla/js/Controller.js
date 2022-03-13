import { EVENT_TYPE } from './views/View.js';

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
      .on(EVENT_TYPE.RESET, this.reset);

  }

  search = ({ detail: { value } }) => {
    this.store.search(value);
    this.render();
  }

  reset = (e) => {
    this.store.reset();
    this.render();
  }

  render = () => {
    if (this.store.searchKeyword.length > 0) {
      debugger;
      this.searchResultView.show(this.store.searchResult);
      return;
    }

    this.searchResultView.hide();
  }
}
