import React, { useEffect, useState } from "react";
import "./App.css";
import { Todo, editTodo, getTodoList } from "@/apis/crud";
import Modal from "react-modal";
import InputBar from "./components/InputBar";
import ToDoList from "./components/ToDoList";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);
  // 모달상태관리 값, 함수들 모달에 띄울 toDo 할당
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal, setModal] = useState({
    id: "",
    title: "",
    done: false,
  });

  // 수정창 useState
  const [areaText, setAreaText] = useState(modal.title);

  // 화면 렌더링 get 함수 useEffect

  useEffect(() => {
    (async () => {
      const resGet = await getTodoList();
      setTodoList(resGet.filter((todo) => !todo.done));
      setDoneList(resGet.filter((todo) => todo.done));
    })();

    // const fetchData = async () => {
    //   try {
    //     const resGet = await getTodoList();
    //     setTodoList(resGet.filter((todo) => !todo.done));
    //     setDoneList(resGet.filter((todo) => todo.done));
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, []);

  // 인덱스나 id가 같은지 비교해보기, 같을때 그 부분에 집어넣게 고민
  const replaceTargetChild = (List: Array<Todo>, updatedChild: Todo) => {
    return List.map((child: Todo) =>
      child.id === updatedChild!.id ? updatedChild : child
    );
  };
  //수정 요청하기
  const requestEdit = async () => {
    const resData = await editTodo(modal.id, {
      title: areaText,
      done: modal.done,
    });
    if (!(resData && typeof resData === "object")) return; // 타입가드
    if (resData.done === false) {
      setTodoList(replaceTargetChild(todoList, resData));
    } else {
      setDoneList(replaceTargetChild(doneList, resData));
    }
    setModalIsOpen(false);
    setAreaText("");
    setModal({ id: "", title: "", done: false || true });
  };

  // 수정하기 버튼 클릭 이벤트 함수
  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!areaText) return;
    requestEdit();
    setModalIsOpen(true);
  };

  // 삭제 요청

  // 모달창 구현하기

  // 모달 취소버튼 이벤트 함수
  const closeModal = () => {
    setModalIsOpen(false);
    setAreaText("");
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
      {/* List 박스 줄 투두리스트와 Done리스트 */}
      <InputBar setTodoList={setTodoList} />
      <div>
        {/* 박스내용 넣기 li ul map함수로 toDo 배열생성 */}
        {/* 수정 삭제 버튼*/}

        {/* Todo 고유key값 안넣으면 map돌릴때 child 고유성없다고 에러 */}

        <ToDoList
          todoList={todoList}
          doneList={doneList}
          setTodoList={setTodoList}
          setDoneList={setDoneList}
          setModal={setModal}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
      {/* 모달창 어떻게 구현할지....*/}
      {/* 클릭한 toDo의 ID값 지정해서 연결? */}
      {/* 버튼 이벤트 추가하기 */}
      <div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>수정하기 모달창 ^__^</h2>
          <form onSubmit={handleSubmitEdit}>
            <input value={areaText} onChange={handleModalText} />
            <button type="submit">수정</button>
            <button onClick={closeModal}>취소</button>
          </form>
        </Modal>
      </div>
      {/* {modal.id && typeof modal === "object" ? <ModalCompo /> : null} */}
    </div>
  );
}

export default App;
