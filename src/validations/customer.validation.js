const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCustomer = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    customerType: Joi.string().required(),
    creditLimit: Joi.number().required(),
    passportNumber: Joi.string().required(),
    address: Joi.object()
      .keys({
        street: Joi.string().required(),
        postalCode: Joi.string(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.number().required(),
      })
      .required(),
    contactPerson: Joi.object().keys({
      name: Joi.string(),
      designation: Joi.string(),
      phone: Joi.number(),
    }),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    customerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      customerType: Joi.string().required(),
      creditLimit: Joi.number().required(),
      passportNumber: Joi.string().required(),
      address: Joi.object()
        .keys({
          street: Joi.string().required(),
          postalCode: Joi.string(),
          city: Joi.string().required(),
          country: Joi.string().required(),
          phone: Joi.number().required(),
        })
        .required(),
      contactPerson: Joi.object().keys({
        name: Joi.string(),
        designation: Joi.string(),
        phone: Joi.number(),
      }),
    })
    .min(1),
};

const deleteCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

const getCustomers = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomers,
};
