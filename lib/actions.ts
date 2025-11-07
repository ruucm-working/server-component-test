"use server";

import { revalidatePath } from "next/cache";
import db from "./db";
import type { Todo } from "./types";

// 모든 todo 가져오기
export async function getTodos(): Promise<Todo[]> {
  const todos = db
    .prepare("SELECT * FROM todos ORDER BY created_at DESC")
    .all() as Todo[];
  return todos;
}

// 새 todo 추가
export async function addTodo(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const title = formData.get("title") as string;

  if (!title || title.trim() === "") {
    return { error: "제목을 입력해주세요." };
  }

  db.prepare("INSERT INTO todos (title, completed) VALUES (?, ?)").run(
    title.trim(),
    0
  );

  revalidatePath("/");
  return { success: true };
}

// todo 완료 상태 토글
export async function toggleTodo(id: number) {
  db.prepare(
    "UPDATE todos SET completed = NOT completed WHERE id = ?"
  ).run(id);

  revalidatePath("/");
  return { success: true };
}

// todo 삭제
export async function deleteTodo(id: number) {
  db.prepare("DELETE FROM todos WHERE id = ?").run(id);

  revalidatePath("/");
  return { success: true };
}

// todo 수정
export async function updateTodo(id: number, title: string) {
  if (!title || title.trim() === "") {
    return { error: "제목을 입력해주세요." };
  }

  db.prepare("UPDATE todos SET title = ? WHERE id = ?").run(title.trim(), id);

  revalidatePath("/");
  return { success: true };
}

