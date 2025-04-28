import express from "express";
import * as todoController from "../controllers/toDoController.js";

const router = express.Router();

router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.removeTodo);

export default router;
