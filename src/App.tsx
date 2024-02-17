import { useState } from "react";
import "./App.css";
import { Todo, createTodo } from "./apis/crud";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // input에 들어갈 데이터 useState
  const [text, setText] = useState<string>("");
  console.log(text);

  // 타이핑값 다루는 함수
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  // 요청하는 함수 ""일때 리턴 , 반환값 트루 and 타입 object 시 렌더링되도록 set
  // create data는 객체.. 기존배열에서 전개해서 넣어줘야됨
  const requestHandle = async () => {
    if (text === "") return;
    const createdData = await createTodo({ title: text });
    if (createdData && typeof createdData === "object")
      setTodoList((beforetoDos) => [...beforetoDos, createdData]);
    setText("");
  };

  // 클릭시 요청 되는것. 클릭하고 요청함수 실행 리렌더링되나 실험
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    requestHandle();
  };

  // 엔터키 입력시 요청되는것 엔터키 이외 리턴,
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "enter") return;
  };

  // 수정하기 버튼 이벤트 함수
  //
  const handleClickEdit = () => {};
  // 삭제하기 버튼 이벤트 함수
  const handleClickRemove = () => {};

  return (
    // 줄별로 div에 담기. 바디 안에 H2

    <body>
      <div>
        <h2>ToDo List!</h2>
      </div>

      {/* input 박스 줄 인풋에 useState 값 value에 연결*/}
      {/* 이벤트 함수 추가 */}
      <div>
        <input
          value={text}
          type="text"
          onChange={handleChangeValue}
          onKeyDown={handleEnter}
        ></input>
        <button onClick={handleClickButton}>등록</button>
      </div>
      {/* List 박스 줄 투두리스트와 Done리스트 */}
      <div>
        {/* 박스내용 넣기 li ul map함수로 toDo 배열생성 */}
        {/* 수정 삭제 버튼*/}
        <div>
          <li className="toDoList">
            {todoList.map((todo) => (
              <div>
                <div>{todo.title}</div>
                <div>
                  {/* 버튼 이벤트 추가하기 */}
                  <button>생성일자</button>
                  <button onClick={handleClickEdit}>수정하기</button>
                  <button onClick={handleClickRemove}>삭제하기</button>
                </div>
              </div>
            ))}
          </li>
        </div>
      </div>
    </body>
  );
}

export default App;
