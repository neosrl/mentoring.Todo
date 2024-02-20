import React, { SetStateAction } from "react";
import { ToDoItem } from "./ToDoItem";
import { Todo } from "@/apis/crud";

const ToDoList: React.FC<IProps> = ({
  todoList,
  doneList,
  setTodoList,
  setModal,
  setDoneList,
  setModalIsOpen,
}) => {
  return (
    <div>
      <ToDoItem
        List={todoList}
        setTodoList={setTodoList}
        setDoneList={setDoneList}
        setModal={setModal}
        setModalIsOpen={setModalIsOpen}
      />
      <ToDoItem
        List={doneList}
        setTodoList={setTodoList}
        setDoneList={setDoneList}
        setModal={setModal}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default ToDoList;

interface IProps {
  todoList: Todo[];
  doneList: Todo[];
  setTodoList: React.Dispatch<SetStateAction<Todo[]>>;
  setDoneList: React.Dispatch<SetStateAction<Todo[]>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ id: string; title: string; done: boolean }>
  >;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
