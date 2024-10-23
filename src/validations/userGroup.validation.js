const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUsergroup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    apiPermissions: Joi.array().items(Joi.string()),
    tabPermissions: Joi.object().pattern(Joi.string(), Joi.array().items(Joi.string())),
  }),
};

const updateUsergroup = {
  params: Joi.object().keys({
    userGroupId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      apiPermissions: Joi.array().items(Joi.string()),
      tabPermissions: Joi.object().pattern(Joi.string(), Joi.array().items(Joi.string())),
    })
    .min(1),
};

const deleteUsergroup = {
  params: Joi.object().keys({
    userGroupId: Joi.string().custom(objectId),
  }),
};

const getUsergroups = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createUsergroup,
  deleteUsergroup,
  updateUsergroup,
  getUsergroups,
};
