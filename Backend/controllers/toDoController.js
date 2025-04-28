import * as todoService from "../services/toDoService.js";

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { title, completed = false } = req.body;
    const newTodo = await todoService.createTodo({ title, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const updatedTodo = await todoService.updateTodo(req.params.id, {
      title,
      completed,
    });
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const removeTodo = async (req, res, next) => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
