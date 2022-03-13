## searchResult 구현하면서 메모.

SearchResultView를 보면

show, hide, list, emptymessage 렌더링 등 화면과 관련된 요소를 그린다.
여기서 놀란점은
1. 공통된 기능을 하는 View 부모 클래스를 만들어서 상속해서 자식 커스텀 View 클래스를 만든다는 점.
2. ResultView에 렌더링 될 오소는 검색 결과만이 아니다. 
	- 그러므로 검색 결과 리스트를 렌더링 하는 Template를 또 따로 클래스로 만들어서 사용한다는 점.
3. 먼저 사용하는 코드를 작성한 다음 구현을 하는 점.
4. Template을 미리 인스턴스화 해놓은 다음, show 메서드에서 검색 결과에 따라 해당 인스턴스의 렌더링 관련 메서드를 호출해서 사용한다는 점. -> 나였으면 함수로 만들었지 클래스는 생각 못했다.
5. Template 클래스는 검색 결과 리스트와 관련된 렌더링 메서드를 제공한다.
6. View에서 event를 발행하면 Controller 등 외부에서 해당 event를 주시하고 이에 따른 처리를 한다.
7. model에 대한 접근과 데이터 관리 등은 controller에서 해야할 줄 알았는데 store에서 한 점. 
8. 현재 단일 store를 사용중이며, store는 초기화할 때 storage(데이터)를 받는다.
9. 즉 store가 model의 역할을 하게되며, store에서 상태를 관리한다. ex) searchKeyword, searchResult
	- 나는 searchKeyword를 저장 안해도 될 줄 알았다. 그냥 keyword를 인자로 전달 해주면 result만 저장하면 될 줄 알았다. 왜? keyword에 대해서 어차피 show or hide 처리만 하니깐.
	- 근데 store에서 상태로 관리한 다음, 이를 Controller에서 사용한다. Controller에서 Model의 상태에 접근해서 그에 따른 로직을 처리하는거였다.
	- 이는 Controller의 render 메서드를 보면 된다. render 메서드에서는 searchKeyword 상태에 따라 View를 보일지 말지 결정한다.
10. View는 단순히 화면 UI를 그리는 역할만 하지, 자기 자신이 어느 시점에 그려질지, 언제 숨겨지고 어느 로직에 따라 보여질지에 대한 책임은 없다.
	- 즉, 자기 자신을 잘 그리는 View를 Controller가 로직에 맞게 그리는것이다.
11. Controller는 View에서 발생된 Event에 대해 Model에 접근하고, 로직에 맞게 다른 View를 그린다. 
	- 현재 코드에서 이를 가능케 하는 로직은 emit이라는 헬퍼 함수를 이용하여 CustomEvent를 발행하고, 이를 Controller에서 on이라는 헬퍼 함수를 이용하여 addEventListener 로 해당 CustomEvent를 리스닝하여 처리한다.
