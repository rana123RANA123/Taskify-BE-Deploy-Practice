const express = require('express');
const validate = require('../../middlewares/validate');
const todoValidation = require('../../validations/todos.validations');
const todoController = require('../../controllers/todos.controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(todoValidation.createTodo), todoController.createTodo)
  .get(validate(todoValidation.getTodos), todoController.getTodos);

router
  .route('/:todoId')
  .get(validate(todoValidation.getTodo), todoController.getTodo)
  .put(validate(todoValidation.updateTodo), todoController.updateTodo)
  .delete(validate(todoValidation.deleteTodo), todoController.deleteTodo);

module.exports = router;
