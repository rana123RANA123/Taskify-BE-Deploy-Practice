const httpStatus = require('http-status');
const ticketService = require('../services/tickets.service');
const Ticket = require('../models/tickets.modal');
const catchAsync = require('../utils/catchAsync');
const { Checklist } = require('../models/checklist.modal');

const createTicket = catchAsync(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);
  res.status(httpStatus.CREATED).send({ ticket });
});

const getTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await Ticket.findById(ticketId);
    const checklists = await Checklist.find({ ticketId });
    return res.json({ ...ticket.toObject(), checklists });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const updateBody = req.body;
  try {
    const updatedTicket = await ticketService.updateTicketById(
      ticketId,
      updateBody
    );
    res.status(httpStatus.OK).send(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(httpStatus.NOT_FOUND).send({ message: 'Ticket not found' });
  }
};

const getTickets = catchAsync(async (req, res) => {
  const { sortBy, limit, page } = req.query;
  const options = { sortBy, limit, page };
  const result = await ticketService.queryTickets({}, options);
  res.status(httpStatus.OK).send(result);
});

const deleteTickets = catchAsync(async (req, res) => {
  const { ticketId } = req.params;
  const ticket = await ticketService.getTicketById(ticketId);
  if (!ticket) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Tickets not found',
    });
  }
  await ticketService.deleteTicketsById(ticketId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTicket,
  updateTicket,
  getTickets,
  getTicket,
  deleteTickets,
};
