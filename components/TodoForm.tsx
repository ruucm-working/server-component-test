"use client";

import { addTodo } from "@/lib/actions";
import { useActionState, useEffect, useRef } from "react";

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState(addTodo, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form ref={formRef} action={formAction} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="새로운 할 일을 입력하세요..."
          className="flex-1 px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "추가 중..." : "추가"}
        </button>
      </div>
      {state?.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}

