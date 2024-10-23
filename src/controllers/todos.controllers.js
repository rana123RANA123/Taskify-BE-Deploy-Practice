const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const todoService = require('../services/todos.service');

const createTodo = catchAsync(async (req, res) => {
  const todo = await todoService.createTodo(req.body);
  res.status(httpStatus.CREATED).send(todo);
});

const getTodos = catchAsync(async (req, res) => {
  const result = await todoService.queryTodos(req.query);
  res.send(result);
});

const getTodo = catchAsync(async (req, res) => {
  const todo = await todoService.getTodoById(req.params.todoId);
  res.send(todo);
});

const updateTodo = catchAsync(async (req, res) => {
  const todo = await todoService.updateTodoById(req.params.todoId, req.body);
  res.send(todo);
});

const deleteTodo = catchAsync(async (req, res) => {
  await todoService.deleteTodoById(req.params.todoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
