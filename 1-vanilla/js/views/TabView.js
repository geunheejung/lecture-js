import View from './View.js';
import { qs, qsAll } from '../helpers.js';

export const TabType = {
  KEYWORD: 'KEYWORD', // 추천
  HISTORY: 'HISTORY'  // 최근
};

const TabLable = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어'
}

export default class SearchResultView extends View {
  constructor() {
    super(qs('#tab-view'));

    this.template = new Template();
  }

  show(selectedTab) {
    this.render();

    qsAll('li', this.element).forEach(li => {
      li.className = li.dataset.tab === selectedTab
        ? 'active'
        : '';
    })

    super.show();
  }

  render() {
    this.element.innerHTML = this.template.getTabList();
  }
}

class Template {
  constructor() {
    this.activated = TabType.KEYWORD;

  }


  getTabList = () => (
    `
      <ul class="tabs">
        ${
          Object.values(TabType)
            .map(tabType => ({ tabType, tabLable: TabLable[tabType] }))
            .map(this._getTab)
            .join('')
        }        
      </ul>
    `
  );

  _getTab = ({ tabType, tabLable }) => {
    return `
      <li 
        data-tab="${tabType}" 
                    
      >
        ${tabLable}
      </li>
    `;
  }
}