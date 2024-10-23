const Joi = require('joi');
const mongoose = require('mongoose');
const { visibility } = require('../config/boardEnums');

const createBoard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    visibility: Joi.string().optional(),
    background: Joi.string().optional().allow(''),
    visibility: Joi.string().valid(...visibility).default('public'),
    favourite: Joi.boolean().optional().default(false),
    workspaceId: Joi.string().required(),

  }),
};

const getBoards = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    status: Joi.string()
      .valid('active', 'inactive', 'archived', 'deleted')
      .optional(),
  }),
};

const getBoard = {
  params: Joi.object().keys({
    boardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid board ID');
        }
        return value;
      })
      .required(),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    boardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid board ID');
        }
        return value;
      })
      .required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      background: Joi.string().optional().allow(''),
      visibility: Joi.string().optional().allow(''),
      list: Joi.array().items(Joi.string()).optional(),
      status: Joi.string()
        .valid('active', 'inactive', 'archived', 'deleted')
        .optional(),
      agencyId: Joi.string().optional().allow(''),
      favourite: Joi.boolean().optional().default(false),
    })
    .min(1),
};

const searchBoards = {
  query: Joi.object().keys({
    query: Joi.string().required(),
  }),
};

const deleteBoard = {
  params: Joi.object().keys({
    boardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid board ID');
        }
        return value;
      })
      .required(),
  }),
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  searchBoards,
};
