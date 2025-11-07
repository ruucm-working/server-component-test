import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "todos.db");
const db = new Database(dbPath);

// 데이터베이스 스키마 초기화
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;

