import { Todo, editTodo } from "@/apis/crud";
import { useState } from "react";
import Modal from "react-modal";

interface IProps {
  modal: { id: string; title: string; done: boolean };
  setModal: React.Dispatch<
    React.SetStateAction<{ id: string; title: string; done: boolean }>
  >;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoList: Todo[];
  doneList: Todo[];
}

const ModalCompo: React.FC<IProps> = ({
  modal,
  setModal,
  modalIsOpen,
  setModalIsOpen,
  setTodoList,
  setDoneList,
  todoList,
  doneList,
}) => {
  const [areaText, setAreaText] = useState(modal.title);

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
  return (
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
  );
};

export default ModalCompo;
