const express = require("express");

const auth = require("../middleware/auth");

const {
  getAllTodosController,
  getTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todo");

const todoRouter = express.Router();

todoRouter.get("/all/:userId", auth, getAllTodosController);

todoRouter.get("/:id", auth, getTodoController);

todoRouter.post("/create", auth, createTodoController);

todoRouter.put("/:id", auth, updateTodoController);

todoRouter.delete("/:id", auth, deleteTodoController);

module.exports = todoRouter;
