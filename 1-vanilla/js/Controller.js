import { EVENT_TYPE } from './views/SearchFormView.js';

export default class Controller {
  constructor(store, { searchFormView }) {
    this.store = store;

    this.searchFormView = searchFormView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents = () => {
    this.searchFormView.on(EVENT_TYPE.SUBMIT, this.search)
      .on(EVENT_TYPE.CLEAR, this.clear);

  }

  search = ({ detail: { value } }) => {
    const { storage: { productData } } = this.store;
    const searhced = productData.filter(({ id, name }) => name.includes(value));

  }

  clear = (e) => {
  }
}
