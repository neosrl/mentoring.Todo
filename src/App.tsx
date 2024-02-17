import { useState } from "react";
import "./App.css";

function App() {
  // input에 들어갈 데이터 useState
  const [text, useText] = useState("");

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
  };

  const handleClickButton = () => {};

  const handleEnter = () => {};

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
        <button onClick={}></button>
      </div>
      {/* List 박스 줄 투두리스트와 Done리스트 */}
      <div>
        <div></div>
        <div></div>
      </div>
    </body>
  );
}

export default App;
