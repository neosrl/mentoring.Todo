import { Todo } from "@/apis/crud";
// sort
// 서버 기준 order 없슴

// 날짜 sort compo
const sortList = (todoList: Todo[]): Todo[] => {
  const transDate = (dateAt: string) => new Date(dateAt);
  return todoList.sort(
    (a, b) =>
      transDate(b.createdAt).valueOf() - transDate(a.createdAt).valueOf()
  );
};

export default sortList;
