import { getTodos } from "@/lib/actions";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

// Server Component - 기본적으로 서버에서만 실행됩니다
export default async function Home() {
  // 서버에서 직접 데이터를 가져옵니다
  const todos = await getTodos();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 dark:from-zinc-950 dark:to-zinc-900 py-12 px-4">
      <main className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Todo List
          </h1>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8">
            React Server Components + SQLite
          </p>

          <TodoForm />
          <TodoList todos={todos} />
        </div>
      </main>
    </div>
  );
}
