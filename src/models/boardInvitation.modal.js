const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { visibility } = require('../config/boardEnums');

const boardInvitationSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: {
      type: String,
      enum: ['pending', 'expired'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

boardInvitationSchema.plugin(toJSON);
boardInvitationSchema.plugin(paginate);

/**
 * @typedef boardInvitations
 */
const boardInvitations = mongoose.model('boardInvitations', boardInvitationSchema);

module.exports = boardInvitations;
