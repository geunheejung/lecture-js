const element = (
  <header>
    <h2 className="container">검색</h2>
  </header>
) // js 표현식이기에 차이가 있다. -> 속성 이름이 다르다. jsx는 카멜 케이스를 사용한다.

ReactDOM.render(element, document.querySelector("#app"))