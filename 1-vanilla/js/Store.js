import { TabType } from './views/TabView.js';

const tag = "[store]";

export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = '';
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  get keywordData() { return this.storage.keywordData; }
  get historyData() { return this.storage.historyData; }

  search = (keyword) => {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(product => product.name.includes(keyword));
  }

  reset = () => {
    this.searchKeyword = '';
    this.searchResult = [];
  }

  removeHistoryData = (index) => {
    const filtered = this.historyData
      .filter(({ id }) => id !== parseInt(index))
      .map((data, idx) => ({ ...data, id: idx + 1 }));

    this.storage.historyData = filtered;
  }

  setHistoryData(keyword) {
    const data = {
      id: this.historyData.length + 1,
      keyword,
      date: new Date(),
    }

    this.storage.historyData.push(data);
  }
}