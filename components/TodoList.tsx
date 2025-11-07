"use client";

import type { Todo } from "@/lib/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
        <p className="text-lg">할 일이 없습니다.</p>
        <p className="text-sm mt-2">위에서 새로운 할 일을 추가해보세요!</p>
      </div>
    );
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>전체 {todos.length}개</span>
        <span>
          완료 {completedCount}개 / 미완료 {todos.length - completedCount}개
        </span>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

