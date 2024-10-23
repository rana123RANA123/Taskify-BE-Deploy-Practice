const express = require('express');
const customerController = require('../../controllers/customer.controller');
const agencyMiddleware = require('../../middlewares/agency');
const validate = require('../../middlewares/validate');
const customerValidation = require('../../validations/customer.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(customerValidation.createCustomer), agencyMiddleware, customerController.createCustomer)
  .get(agencyMiddleware, customerController.getCustomers);

router
  .route('/:customerId')
  .get(agencyMiddleware, customerController.getCustomer)
  .patch(validate(customerValidation.updateCustomer), agencyMiddleware, customerController.updateCustomer)
  .delete(validate(customerValidation.deleteCustomer), agencyMiddleware, customerController.deleteCustomer);

module.exports = router;
