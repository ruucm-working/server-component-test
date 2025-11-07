"use client";

import { toggleTodo, deleteTodo, updateTodo } from "@/lib/actions";
import type { Todo } from "@/lib/types";
import { useState, useTransition } from "react";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTodo(todo.id);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTodo(todo.id);
    });
  };

  const handleUpdate = () => {
    if (editTitle.trim() === "") return;

    startTransition(async () => {
      await updateTodo(todo.id, editTitle);
      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-all">
      {!isEditing ? (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={isPending}
            className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
          />
          <span
            className={`flex-1 ${
              todo.completed
                ? "line-through text-zinc-400 dark:text-zinc-500"
                : "text-zinc-900 dark:text-white"
            }`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            disabled={isPending}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
          >
            삭제
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            disabled={isPending}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />
          <button
            onClick={handleUpdate}
            disabled={isPending}
            className="px-3 py-1 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50"
          >
            저장
          </button>
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="px-3 py-1 text-sm text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 disabled:opacity-50"
          >
            취소
          </button>
        </>
      )}
    </li>
  );
}

