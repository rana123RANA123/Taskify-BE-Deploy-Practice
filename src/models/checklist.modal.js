const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  checklistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true,
  },
});

const checklistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  todos: [TodoSchema],
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrelloTickets',
    required: true,
  },
});

checklistSchema.plugin(toJSON);
checklistSchema.plugin(paginate);

const Checklist = mongoose.model('Checklist', checklistSchema);
const Todos = mongoose.model('Todos', TodoSchema);
module.exports = {
  Checklist,
  Todos,
};
