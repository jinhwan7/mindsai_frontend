"use client";

import { useState } from "react";
import { addTodo, deleteTodo, toggleTodo } from "@/app/actions/todo";
import { TodoItem } from "./todo-item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import { Todo } from "@/types/todo";

interface TodoListProps {
  initialTodos: Todo[];
}

const Container = styled.div`
  max-width: 28rem;
  margin: 2.5rem auto 0;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const TodoForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export function TodoList({ initialTodos }: TodoListProps) {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
        userId: 1,
      };
      try {
        await addTodo(todo.title);
        setTodos([...todos, todo]);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  }
  async function handleToggle(id: number) {
    try {
      await toggleTodo(id);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  return (
    <Container>
      <Title>할 일 목록</Title>
      <TodoForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새로운 할 일을 입력하세요"
          style={{ flexGrow: 1 }}
        />
        <Button type="submit">추가</Button>
      </TodoForm>
      <TodoListContainer>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </TodoListContainer>
    </Container>
  );
}
