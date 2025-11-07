export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export type NewTodo = Omit<Todo, "id" | "created_at" | "completed">;

