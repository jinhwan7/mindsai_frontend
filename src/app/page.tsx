"use client";

import { useEffect, useState } from "react";
import { fetchInitialTodos, loadFromLocalStorage } from "./actions/todo";
import { TodoList } from "@/components/todo-list";
import { Todo } from "@/types/todo";
import Loading from "./loading";

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 컴포넌트가 마운트된 후에 로컬스토리지 확인
    const localData = loadFromLocalStorage();
    if (localData) {
      // 로컬스토리지에 값이 있으면 그걸 사용
      setTodos(localData);
    } else {
      // 없으면 서버에서 fetch → 로컬스토리지 저장
      fetchInitialTodos().then((data) => {
        setTodos(data);
      });
    }
  }, []);
  if (!isMounted) {
    return <Loading />; // 초기 마운트 전에는 로딩 상태 표시
  }
  return <TodoList initialTodos={todos} />;
}
