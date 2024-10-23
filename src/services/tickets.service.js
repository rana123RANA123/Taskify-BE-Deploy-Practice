const httpStatus = require('http-status');
const TrelloTickets = require('../models/tickets.modal');
const Ticket = require('../models/tickets.modal');
const ApiError = require('../utils/ApiError');
const { Checklist } = require('../models/checklist.modal');

const createTicket = async (cardBody) => {
  const card = await TrelloTickets.create(cardBody);
  return card;
};

const getTicketById = async (id) => {
  return TrelloTickets.findById(id).populate('members');
};

const updateTicketById = async (
  ticketId,
  updateBody,
  description,
  comments
) => {
  const card = await TrelloTickets.findById(ticketId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  Object.assign(card, updateBody, description, comments);
  await card.save();
  return card;
};

const queryTickets = async (filter, options) => {
  const cards = await TrelloTickets.paginate(filter, options);
  return cards;
};

const deleteTicketsById = async (ticketId) => {
  const card = await TrelloTickets.findById(ticketId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  await card.remove();
  return card;
};

const getTicketWithChecklists = async (ticketId) => {
  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const checklists = await Checklist.findById({ ticketId: ticketId });

    return { ...ticket.toObject(), checklists };
  } catch (error) {
    throw new Error(`Error fetching ticket with checklists: ${error.message}`);
  }
};

module.exports = {
  createTicket,
  getTicketById,
  updateTicketById,
  queryTickets,
  deleteTicketsById,
  getTicketWithChecklists,
};
