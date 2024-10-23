const Joi = require('joi');
const mongoose = require('mongoose');
const { options } = require('../config/workspaceEnums');

const createWorkSpace = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    options: Joi.string()
    .valid(...options).default('Others'),
  }),
};

const getWorkSpaces = {
  params: Joi.object().keys({
    title: Joi.string().optional(),
    options: Joi.string()
      .valid(...options).default('Others'),
  }),
};

const getWorkSpace = {
  params: Joi.object().keys({
    workSpaceId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid WorkSpace ID');
        }
        return value;
      })
      .required(),
  }),
};

const updateWorkspace = {
  params: Joi.object().keys({
    workSpaceId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid workspace ID');
        }
        return value;
      })
      .required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      options: Joi.string().optional().allow(''),
    })
    .min(1),
};

const deleteWorkspace = {
  params: Joi.object().keys({
    workSpaceId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid workspace ID');
        }
        return value;
      })
      .required(),
  }),
};

module.exports = {
  createWorkSpace,
  getWorkSpaces,
  getWorkSpace,
  deleteWorkspace,
  updateWorkspace
};
