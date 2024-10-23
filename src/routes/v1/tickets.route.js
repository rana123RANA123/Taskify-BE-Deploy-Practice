const express = require('express');
const validate = require('../../middlewares/validate');
const ticketController = require('../../controllers/tickets.controller');
const ticketValidation = require('../../validations/tickets.validations');

const router = express.Router();

router
  .route('/')
  .post(validate(ticketValidation.createTicket), ticketController.createTicket)
  .get(validate(ticketValidation.getTickets), ticketController.getTickets);

router
  .route('/:ticketId')
  .get(validate(ticketValidation.getTicket), ticketController.getTicket)
  .put(validate(ticketValidation.updateTicket), ticketController.updateTicket)
  .delete(
    validate(ticketValidation.deleteTicket),
    ticketController.deleteTickets
  );

module.exports = router;
