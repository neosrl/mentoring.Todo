import { Todo, deleteTodo, editTodo } from "@/apis/crud";
import sortList from "@/components/SortCompo";
import React from "react";

interface IProps {
  List: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ id: string; title: string; done: boolean }>
  >;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToDoItem: React.FC<IProps> = ({
  List,
  setTodoList,
  setDoneList,
  setModal,
  setModalIsOpen,
}) => {
  // 날짜변환 -> CHatGPT에게 질문..
  // new Intl.DateTimeFormat('en-GB', {
  //     dateStyle: 'full',
  //     timeStyle: 'long',
  //     timeZone: 'Australia/Sydney',
  //   }).format(date),
  // );
  const localeDateString = (tododate: string) => {
    const dateString = tododate;
    const localeDate = new Date(dateString);
    const koreanDate = localeDate.toLocaleDateString("ko-KR", {
      weekday: "short",
      year: "2-digit",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return koreanDate; // Output: "2024년 2월 19일 화요일"
  };

  // toDO에서 done으로 서로 변경할 수 있게
  // Done : boolean => !boolean 바꾸기, 기존 순서에서 정렬 어떻게 할건지,
  const handleChangeDoneClick = async (
    id: string,
    title: string,
    done: boolean
  ) => {
    const newStateDone = !done;
    const doneRes = await editTodo(id, { title: title, done: newStateDone });
    if (!doneRes) return;
    if (newStateDone) {
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
      setDoneList((prevList) => sortList([...prevList, doneRes as Todo]));
    } else {
      setDoneList((prevList) => prevList.filter((todo) => todo.id !== id));
      setTodoList((prevList) => sortList([...prevList, doneRes as Todo]));
    }
  };

  //  삭제하기 버튼 이벤트 함수
  const handleClickRemove = async (todoID: string, Done: boolean) => {
    const removeRes = await deleteTodo(todoID);
    if (!removeRes) return;
    !Done
      ? setTodoList(List.filter((todo: { id: string }) => todo.id !== todoID))
      : setDoneList(List.filter((todo: { id: string }) => todo.id !== todoID));
  };

  return (
    <li className="toDoList">
      {List.map((todo: Todo) => (
        <div key={todo.id}>
          <div>{todo.title}</div>
          <div>{localeDateString(todo.createdAt)}</div>
          <button
            onClick={() => {
              setModal({ id: todo.id, title: todo.title, done: todo.done });
              setModalIsOpen(true);
            }}
          >
            수정하기
          </button>
          <button onClick={() => handleClickRemove(todo.id, todo.done)}>
            삭제하기
          </button>
          <button
            onClick={() =>
              handleChangeDoneClick(todo.id, todo.title, todo.done)
            }
          >
            완료변경
          </button>
        </div>
      ))}
    </li>
  );
};

// interface IProps {
//   List: Todo[];
//   setTodoList: React.Dispatch<SetStateAction<Todo[]>>;
//   setDoneList: React.Dispatch<SetStateAction<Todo[]>>;
//   setModal: React.Dispatch<
//     React.SetStateAction<{ id: string; title: string; done: boolean }>
//   >;
//   setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }
