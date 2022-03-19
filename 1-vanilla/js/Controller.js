import { EVENT_TYPE } from './views/View.js';

export default class Controller {
  constructor(store, {
    searchFormView,
    searchResultView,
    tabView,
    tabResultView,
  }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.tabResultView = tabResultView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents = () => {
    this.searchFormView
      .on(EVENT_TYPE.SUBMIT, this.search)
      .on(EVENT_TYPE.RESET, this.reset);

    this.tabView
      .on(EVENT_TYPE.CHANGE, this.handleTab)
  }

  search = ({ detail: { value } }) => {
    this.store.search(value);
    this.render();
  }

  reset = (e) => {
    this.store.reset();
    this.render();
  }

  handleTab = ({ detail: { tabType } }) => {
    this.store.selectedTab = tabType;
    this.render();
  }

  render = () => {
    const {
      searchKeyword,
      selectedTab,
    } = this.store;

    if (searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    this.tabView.show(selectedTab);
    this.tabResultView.show(this.store.tabData)
    this.searchResultView.hide();
  }

  renderSearchResult = () => {
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
