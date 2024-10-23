const Joi = require('joi');

const createChecklist = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    ticketId: Joi.string().required(),
    todos: Joi.array().items(
      Joi.object().keys({
        description: Joi.string().required(),
        isCompleted: Joi.boolean(),
      })
    ),
  }),
};

const getChecklist = {
  params: Joi.object().keys({
    id: Joi.string().required(),
    ticketId: Joi.string().required(),
  }),
};

const updateChecklist = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    todos: Joi.array().items(
      Joi.object().keys({
        description: Joi.string(),
        isCompleted: Joi.boolean(),
      })
    ),
  }),
};

const deleteChecklist = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createChecklist,
  getChecklist,
  updateChecklist,
  deleteChecklist,
};
