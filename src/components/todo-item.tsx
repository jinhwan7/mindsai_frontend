"use client";

import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import styled from "styled-components";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TodoLabel = styled.label<{ $completed: boolean }>`
  flex-grow: 1;
  ${(props) =>
    props.$completed &&
    `
    text-decoration: line-through;
    color: #6b7280;
  `}
`;

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <TodoItemContainer>
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <TodoLabel htmlFor={`todo-${todo.id}`} $completed={todo.completed}>
        {todo.title}
      </TodoLabel>
      <Button
        $variant="ghost"
        $size="icon"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </TodoItemContainer>
  );
}
