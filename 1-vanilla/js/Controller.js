import { EVENT_TYPE } from './views/View.js';

export default class Controller {
  constructor(store, {
    searchFormView,
    searchResultView,
    TabView,
  }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = TabView;

    this.subscribeViewEvents();
    this.render();
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
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();
  }

  renderSearchResult = () => {
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
