const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const TrelloTickets = require('./tickets.modal');

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'archived', 'deleted'],
      default: 'active',
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boards',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


cardSchema.pre('remove', async function (next) {
  try {
    await TrelloTickets.deleteMany({ listId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});



cardSchema.plugin(toJSON);
cardSchema.plugin(paginate);

const TrelloCards = mongoose.model('TrelloCards', cardSchema);

module.exports = TrelloCards;
