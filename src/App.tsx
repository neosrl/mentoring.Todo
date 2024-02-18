import { useEffect, useState } from "react";
import "./App.css";
import { Todo, createTodo, editTodo, getTodoList } from "./apis/crud";
import React from "react";
import Modal from "react-modal";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // 모달상태관리 값, 함수들 모달에 띄울 toDo 할당
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal, setModal] = useState({
    id: "",
    title: "",
    done: false,
  });
  // inputbar에 들어갈 데이터 useState
  const [text, setText] = useState<string>("");
  console.log(text);

  // 수정창 useState
  const [areaText, setAreaText] = useState(modal.title);

  // 화면 렌더링 get 함수 useEffect
  useEffect(() => {
    async () => {
      const resData = await getTodoList();
      setTodoList(resData);
    };
  }, []);

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
    requestHandle();
  };

  //수정 요청하기

  const requestEdit = async () => {
    const resData = await editTodo(modal.id, {
      title: areaText,
      done: modal.done,
    });

    if (resData && typeof resData === "object") console.log(resData);
    // setTodoList(res);
    setModalIsOpen(false);
    setModal({ id: "", title: "", done: false || true });
  };

  // 수정하기 버튼 클릭 이벤트 함수
  const handleSubmitEdit = () => {
    if (!areaText) return;
    requestEdit();
  };

  //  삭제하기 버튼 이벤트 함수
  // const handleClickRemove = () => {};

  // 날짜변환 -> Fail...
  // console.log(todoList[0].createdAt);
  // const tranferDate = todoList.map((list) => list.createdAt).toLocaleString;

  // 모달창 구현하기

  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달 취소버튼 이벤트 함수
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // 모달창 input text 이벤트 함수
  const handleModalText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const modalText = e.target.value;
    setAreaText(modalText);
  };

  // const handleClickTodo = () => {
  //   const findID = find();
  //   setModalOpen();
  // };

  return (
    // 줄별로 div에 담기. 바디 안에 H2

    <div>
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
        <li className="toDoList">
          {todoList.map((todo) => (
            // Todo wrapper display flex
            // Todo 고유key값 안넣으면 map돌릴때 child 고유성없다고 에러

            <div key={todo.id}>
              <div>{todo.title}</div>
              <div>{todo.createdAt}</div>
              <button
                onClick={() => {
                  setModal({ id: todo.id, title: todo.title, done: todo.done });
                  openModal();
                }}
              >
                수정하기
              </button>
              <div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  <h2>모달 제목</h2>
                  <form onSubmit={handleSubmitEdit}>
                    <input
                      value={areaText}
                      defaultValue={modal.title}
                      onChange={handleModalText}
                    />

                    <button type="submit">수정</button>
                  </form>
                </Modal>
              </div>
              {/* <button onClick={handleClickRemove}>삭제하기</button> */}
            </div>
          ))}
        </li>
      </div>
      {/* 모달창 어떻게 구현할지.... */}
      {/* 클릭한 toDo의 ID값 지정해서 연결? */}
      {/* 버튼 이벤트 추가하기 */}

      {/* {modal.id && typeof modal === "object" ? <ModalCompo /> : null} */}
    </div>
  );
}

export default App;
