import { Todo } from "@/types/todo";

export const loadFromLocalStorage = (): Todo[] | null => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : null;
};

const saveToLocalStorage = (data: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(data));
};

export async function fetchInitialTodos(): Promise<Todo[]> {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    if (!res.ok) {
      if (res.status >= 500) {
        throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
      if (res.status >= 400) {
        throw new Error("잘못된 요청입니다. 입력값을 확인해주세요.");
      }
    }
    const data = await res.json();
    saveToLocalStorage(data);
    return data;
  } catch (error) {
    console.error("할 일 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
}

export async function addTodo(text: string): Promise<Todo> {
  const todos = loadFromLocalStorage() || [];
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false,
    userId: 1,
  };
  const updatedTodos = [...todos, newTodo];
  saveToLocalStorage(updatedTodos);
  return newTodo;
}

export async function toggleTodo(id: number) {
  const todos = loadFromLocalStorage() || [];
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveToLocalStorage(updatedTodos);
  return updatedTodos.find((todo) => todo.id === id);
}

export async function deleteTodo(id: number) {
  const todos = loadFromLocalStorage() || [];
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  saveToLocalStorage(updatedTodos);
  return true;
}
