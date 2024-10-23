const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Customer = require('../models/customer.model');

const createCustomer = async (userBody) => {
  return Customer.create(userBody);
};

const getCustomerById = async (id) => Customer.findById(id);

const queryCustomer = async (filter, options) => Customer.paginate(filter, options);

const updateCustomerById = async (customerId, updateBody) => {
  const customer = await getCustomerById(customerId);

  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }

  Object.assign(customer, updateBody);
  await customer.save();

  return customer;
};

const deleteCustomerById = async (customerId) => {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  await customer.remove();
  return customer;
};

module.exports = {
  queryCustomer,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
};
