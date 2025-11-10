// app/page.tsx
import { addTodo, toggleTodo, deleteTodo } from "@/lib/actions";
import { getTodos } from "@/lib/actions";

export default async function Page() {
  const todos = await getTodos();

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Todos</h1>

      {/* 추가 폼 */}
      <form action={addTodo} style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          type="text"
          name="title"
          placeholder="할 일을 입력하세요"
          style={{ flex: 1, padding: 8, border: "1px solid #ddd", borderRadius: 8 }}
        />
        <button
          type="submit"
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        >
          추가
        </button>
      </form>

      {/* 목록 */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {todos.map((t) => (
          <li key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                border: "1px solid #eee",
                borderRadius: 8,
                marginBottom: 8,
                background: "#fff"
              }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* 체크 토글(폼으로 바로 서버 액션 호출) */}
              <form action={toggleTodo}>
                <input type="hidden" name="id" value={t.id} />
                <input
                  type="hidden"
                  name="done"
                  value={(!t.completed).toString()}
                />
                <button
                  type="submit"
                  aria-label="toggle"
                  style={{ border: "1px solid #ddd", borderRadius: 6, padding: "4px 8px" }}
                >
                  {t.completed ? "✅" : "⬜"}
                </button>
              </form>

              <span style={{
                textDecoration: t.completed ? "line-through" : "none",
                color: t.completed ? "#999" : "#222"
              }}>
                {t.title}
              </span>
            </div>

            {/* 삭제 */}
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={t.id} />
              <button
                type="submit"
                aria-label="삭제"
                style={{ border: "1px solid #f1c0c0", background: "#fff5f5", borderRadius: 6, padding: "4px 8px" }}
              >
                삭제
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
