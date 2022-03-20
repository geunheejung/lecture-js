export default class Template {
  constructor(ulClass) {
    this.ulClass = ulClass;
  }

  getList = (data = []) => {
    return `
      <ul class="${this.ulClass}">${data.map(this._getItem)}</ul>
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