import axios from "axios";

const baseURL =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";

const apikey = "KDT5_nREmPe9B";
const username = "KDT5_SongSuYeon";

const headers = {
  "content-type": "application/json",
  apikey,
  username,
};

const requestTodo = axios.create({
  baseURL,
  headers,
});

// 전체 항목 호출
export const getTodoList = async (): Promise<Todo[]> => {
  try {
    const { data } = await requestTodo.get("");
    return data;
  } catch (error) {
    console.warn(error);
    console.warn("Fail to load TodoList");
    return [];
  }
};

// 항목 순서 변경
export const reorderTodoList = async (
  payload: ReorderTodo
): Promise<boolean> => {
  try {
    const { data } = await requestTodo.put("reorder", payload);
    return data;
  } catch (error) {
    console.warn(error);
    console.warn("Fail to reorder TodoList");
    return false;
  }
};

// 항목 추가
export const createTodo = async (
  payload: CreateTodo
): Promise<Todo | boolean> => {
  try {
    const { data } = await requestTodo.post("", payload);
    return data;
  } catch (error) {
    console.warn(error);
    console.warn("Fail to create Todo");
    return false;
  }
};

// 항목 수정
export const editTodo = async (
  id: string,
  payload: EditTodo
): Promise<Todo | boolean> => {
  try {
    const { data } = await requestTodo.put(id, payload);
    return data;
  } catch (error) {
    console.warn(error);
    console.warn("Fail to edit Todo");
    return false;
  }
};

// 항목 삭제
export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const { data } = await requestTodo.delete(id);
    return data;
  } catch (error) {
    console.warn(error);
    console.warn("Fail to delete Todo");
    return false;
  }
};

export interface Todo {
  id: string; // 할 일 ID
  order: number; // 할 일 순서
  title: string; // 할 일 제목
  done: boolean; // 할 일 완료 여부
  createdAt: string; // 할 일 생성일
  updatedAt: string; // 할 일 수정일
}

export interface ReorderTodo {
  todoIds: string[];
}

export interface CreateTodo {
  title: string; // 할 일 제목
  order?: number; // 할 일 순서
}

export interface EditTodo {
  title: string; // 할 일 제목 (필수!)
  done: boolean; // 할 일 완료 여부 (필수!)
  order?: number; // 할 일 순서
}
