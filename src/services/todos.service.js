const { Todos } = require('../models/checklist.modal');

const createTodo = async (todoBody) => {
  return Todos.create(todoBody);
};

const queryTodos = async () => {
  const todos = await Todos.find();
  return todos;
};

const getTodoById = async (id) => {
  return Todos.findById(id);
};

const updateTodoById = async (todoId, updateBody) => {
  const todo = await getTodoById(todoId);
  Object.assign(todo, updateBody);
  await todo.save();
  return todo;
};

const deleteTodoById = async (todoId) => {
  const todo = await getTodoById(todoId);
  await todo.remove();
  return todo;
};

module.exports = {
  createTodo,
  queryTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
