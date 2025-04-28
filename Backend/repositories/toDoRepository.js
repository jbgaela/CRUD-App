import db from "../config/db.js";

export const findAllTodosDB = async () => {
  const [rows] = await db.query("SELECT * FROM todos");
  return rows;
};

export const findTodoByIdDB = async (id) => {
  const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
  return rows[0];
};

export const createTodoDB = async ({ title, completed }) => {
  const [result] = await db.query(
    "INSERT INTO todos (title, completed) VALUES (?, ?)",
    [title, completed]
  );
  return { id: result.insertId, title, completed };
};

export const updateTodoDB = async (id, { title, completed }) => {
  await db.query("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [
    title,
    completed,
    id,
  ]);
};

export const deleteTodoDB = async (id) => {
  await db.query("DELETE FROM todos WHERE id = ?", [id]);
};
