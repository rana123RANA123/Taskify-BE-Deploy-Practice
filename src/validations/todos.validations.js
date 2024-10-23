const Joi = require('joi');
const mongoose = require('mongoose');

const createTodo = {
  body: Joi.object().keys({
    description: Joi.string().required(),
    isCompleted: Joi.boolean(),
    checklistId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid ObjectId');
        }
        return value;
      })
      .optional(),
  }),
};

const getTodos = {
  query: Joi.object().keys({
    description: Joi.string(),
    isCompleted: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
      }
      return value;
    }),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
      }
      return value;
    }),
  }),
  body: Joi.object()
    .keys({
      description: Joi.string(),
      isCompleted: Joi.boolean(),
      checklistId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid ObjectId');
        }
        return value;
      }),
    })
    .min(1),
};

const deleteTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
      }
      return value;
    }),
  }),
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
