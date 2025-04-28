import * as todoRepository from "../repositories/toDoRepository.js";

export const getAllTodos = async () => await todoRepository.findAllTodosDB();

export const getTodoById = async (id) => {
  const todo = await todoRepository.findTodoByIdDB(id);
  if (!todo) throw new Error("To do not found");
  return todo;
};

export const createTodo = async (todo) =>
  await todoRepository.createTodoDB(todo);

export const updateTodo = async (id, todo) => {
  await getTodoById(id);
  await todoRepository.updateTodoDB(id, todo);
  return { id, ...todo };
};

export const deleteTodo = async (id) => {
  await getTodoById(id);
  await todoRepository.deleteTodoDB(id);
};
