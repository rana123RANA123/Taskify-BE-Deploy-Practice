const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const createAgency = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    logoUrl: Joi.string().required().custom(password),
    name: Joi.string().required(),
    // role: Joi.string().required(),
  }),
};
const updateAgency = {
  params: Joi.object().keys({
    agencyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string().custom(password),
      logoUrl: Joi.string(),
      isActive: Joi.boolean(),
      isAssigned: Joi.boolean(),
    })
    .min(1),
};
const deleteAgency = {
  params: Joi.object().keys({
    agencyId: Joi.string().custom(objectId),
  }),
};
const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('AGENCY_ADMIN', 'AGENCY_USER'),
    agencyId: Joi.string().required(),
  }),
};

const getAgencies = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  login,
  createAgency,
  deleteAgency,
  updateAgency,
  createUser,
  getAgencies,
  getUser,
  updateUser,
  deleteUser,
};
