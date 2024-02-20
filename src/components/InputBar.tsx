import { Todo, createTodo } from "@/apis/crud";
import { useState } from "react";

export const InputBar: React.FC<IProps> = ({ setTodoList }) => {
  // inputbar에 들어갈 데이터 useState
  const [text, setText] = useState("");
  // 타이핑값 다루는 함수
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };
  // 클릭시 요청 되는것. 클릭하고 요청함수 실행 리렌더링되나 실험
  const handleClickButton = () => {
    requestCreate();
  };
  // 엔터키 입력시 요청되는것 엔터키 이외 리턴,
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "enter") return;
    requestCreate();
  };

  // 요청하는 함수 ""일때 리턴 , 반환값 트루 and 타입 object 시 렌더링되도록 set
  // create data는 객체.. 기존배열에서 전개해서 넣어줘야됨
  const requestCreate = async () => {
    if (text === "") return;
    const createdData = await createTodo({ title: text });
    if (createdData && typeof createdData === "object")
      setTodoList((beforetoDos) => [createdData, ...beforetoDos]);
    setText("");
  };

  return (
    <div>
      <input
        value={text}
        type="text"
        onChange={handleChangeValue}
        onKeyDown={handleEnter}
      ></input>
      <button onClick={handleClickButton}>등록</button>
    </div>
  );
};

export default InputBar;

interface IProps {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}
