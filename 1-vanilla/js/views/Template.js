export default class Template {
  constructor(listClassName = 'list') {
    this.listClassName = listClassName;
  }

  getList = (data = []) => {
    return `
      <ul class="${this.listClassName}">${data.map(this._getItem).join('')}</ul>
    `
  }

  _getItem = () => {
    throw '_not overlide';
  }

  getEmptyMessage = () => {
    return ` 
      <div class="empty-box">검색결과가 없습니다.</div>
    `;
  }
}