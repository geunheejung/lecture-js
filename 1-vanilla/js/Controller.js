import { hideAll } from './helpers.js';
import { EVENT_TYPE } from './views/View.js';
import { TabType } from './views/TabView.js';

export default class Controller {
  constructor(store, {
    searchFormView,
    searchResultView,
    tabView,
    keywordListView,
    historyListView,
  }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents = () => {
    const { searchFormView, tabView, keywordListView, historyListView } = this;
    searchFormView
      .on(EVENT_TYPE.SUBMIT, this.search)
      .on(EVENT_TYPE.RESET, this.reset)
      .on(EVENT_TYPE.SAVE, this.save);

    tabView
      .on(EVENT_TYPE.CHANGE, this.handleTab);

    [keywordListView, historyListView].forEach(view =>
      view.on(EVENT_TYPE.MOVE, this.moveToKeyword)
    );

    historyListView
      .on(EVENT_TYPE.REMOVE, this.remove);
  }

  search = ({ detail: { data } }) => {
    this.searchFormView.show(data);
    this.store.search(data);
    this.render();
  }

  reset = () => {
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

  remove = ({ detail: data }) => {
    this.store.removeHistoryData(data);
    this._renderTabList();
  }

  save = ({ detail: data }) => {
    this.store.setHistoryData(data);
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
    const { keywordListView, historyListView, store: { selectedTab } } = this;

    switch (selectedTab) {
      case TabType.KEYWORD:
        keywordListView.show(this.store.keywordData);
        this.historyListView.hide();
        break;
      case TabType.HISTORY:
        historyListView.show(this.store.historyData);
        keywordListView.hide();
        break;
      default:
        throw 'not matched tab';
    }
  }

  _renderSearchResult = () => {
    hideAll(this.tabView, this.keywordListView, this.historyListView);
    this.searchResultView.show(this.store.searchResult);
  }
}
