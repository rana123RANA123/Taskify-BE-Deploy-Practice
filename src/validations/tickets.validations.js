const Joi = require('joi');
const mongoose = require('mongoose');

const createTicket = {
  body: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid('active', 'inactive', 'archived', 'deleted')
      .optional(),
    listId: Joi.string().required(),
    boardId: Joi.string().required(),
  }),
};

const getTickets = {
  query: Joi.object().keys({
    title: Joi.string().optional(),
    status: Joi.string()
      .valid('active', 'inactive', 'archived', 'deleted')
      .optional(),
  }),
};

const getTicket = {
  params: Joi.object().keys({
    ticketId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid Ticket ID');
        }
        return value;
      })
      .required(),
  }),
};

const updateTicket = {
  params: Joi.object().keys({
    ticketId: Joi.string()
      .optional()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid Ticket ID');
        }
        return value;
      })
      .required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      status: Joi.string()
        .valid('active', 'inactive', 'archived', 'deleted')
        .optional(),
      members: Joi.array().items(Joi.string()).optional(),
      listId: Joi.string().optional(),
      description: Joi.string().optional(),
      comments: Joi.string().optional(),
    })
    .min(1),
};

const deleteTicket = {
  params: Joi.object().keys({
    ticketId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid ticket ID');
        }
        return value;
      })
      .required(),
  }),
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
