const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  status:{
      type: String,
      required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
