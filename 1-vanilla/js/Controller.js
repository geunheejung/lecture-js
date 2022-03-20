import { hideAll } from './helpers.js';
import { EVENT_TYPE } from './views/View.js';
import { TabType } from './views/TabView.js';

export default class Controller {
  constructor(store, {
    searchFormView,
    searchResultView,
    tabView,
    keywordListView,
  }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents = () => {
    this.searchFormView
      .on(EVENT_TYPE.SUBMIT, this.search)
      .on(EVENT_TYPE.RESET, this.reset);

    this.tabView
      .on(EVENT_TYPE.CHANGE, this.handleTab);

    this.keywordListView.on(EVENT_TYPE.MOVE, this.moveToKeyword);
  }

  search = ({ detail: { data } }) => {
    this.searchFormView.changeInput(data);
    this.store.search(data);
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

  moveToKeyword = (e) => {
    this.search(e);
  }

  render = () => {
    const { searchKeyword, selectedTab, } = this.store;

    if (searchKeyword.length > 0) {
      return this._renderSearchResult();
    }

    this.tabView.show(selectedTab);
    this._renderTabList();
    this.searchResultView.hide();
  }

  _renderTabList = () => {
    const { keywordListView, store: { selectedTab } } = this;

    switch (selectedTab) {
      case TabType.KEYWORD:
        keywordListView.show(this.store.keywordData);
        break;
      case TabType.HISTORY:
        keywordListView.hide();
        break;
      default:
        throw 'not matched tab';
    }
  }

  _renderSearchResult = () => {
    hideAll(this.tabView, this.keywordListView)
    this.searchResultView.show(this.store.searchResult);
  }
}
