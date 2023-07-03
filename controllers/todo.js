const Todo = require("../models/todo");

const getAllTodosController = async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await Todo.find({ userId });
    console.log(todos);
    res.status(200).json({ todos: todos });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

const getTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    console.log(todo);
    res.status(200).json({ todo: todo });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

const createTodoController = async (req, res) => {
  try {
    const { userId, title, description, dueDate, createdAt, status } = req.body;
    if (!userId || !title || !description || !dueDate || !createdAt) {
      return res.status(400).json({ error: "Please provide all the fields!" });
    }
    const todo = new Todo({
      userId,
      title,
      description,
      dueDate,
      createdAt,
      status,
    });
    const savedTodo = await todo.save();
    res.status(200).json({ todo: savedTodo });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

const updateTodoController = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description, dueDate, status, updatedAt } = req.body;
    if (!title || !description || !dueDate || !status || !updatedAt) {
      return res.status(400).json({ error: "Please provide all the fields!" });
    }
    const todo = await Todo.findById(id);
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo.dueDate = dueDate;
      todo.status = status;
      todo.updatedAt = updatedAt;
      const savedTodo = await todo.save();
      console.log(savedTodo);
      res.status(200).json({ todo: savedTodo });
    } else {
      res.status(404).json({ error: "Todo not found!" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (todo) {
      await todo.deleteOne();
      res.status(200).json({ message: "Todo deleted successfully!" });
    } else {
      res.status(404).json({ error: "Todo not found!" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

module.exports = {
  getAllTodosController,
  getTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
