const httpStatus = require('http-status');
const Boards = require('../models/boards.modal');
const ApiError = require('../utils/ApiError');
const boardInvitations = require('../models/boardInvitation.modal');
const User = require('../models/user.model');
const { shareBoardMails } = require('./email.service');

const createInvitation = async (boardId, userId) => {
  const board = await Boards.findById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, `Board not found: ${boardId}`);
  }

  const boardUser = await User.findById(board.userId);
  if (!boardUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Board owner not found: ${board.userId}`
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not found: ${userId}`);
  }
  const existingInvitation = await boardInvitations.findOne({
    boardId,
    userId,
  });
  if (existingInvitation) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'This invitation has already been sent.'
    );
  }

  const toEmail = boardUser.email;
  const fromEmail = user.email;
  const fromName = user.name;
  const boardName = board.name;
  const boardLink = `${process.env.LINK_URL}/${boardId}/board`;
  const boardOwnerName = boardUser.name;
  const fromUserName = user.name;
  const subject = 'Trello';

  shareBoardMails({
    toEmail,
    fromEmail,
    fromName,
    boardName,
    boardLink,
    boardOwnerName,
    fromUserName,
    subject,
  });

  const createInvitation = await boardInvitations.create({ boardId, userId });

  return createInvitation;
};

const getInvitationDataById = async (invitationId) => {
  const invitation = await boardInvitations.findById(invitationId);
  return invitation;
};

const queryBoardInvitations = async (filter, options) => {
  const invitations = await boardInvitations.paginate(filter, options);

  const oneDayTime = 24 * 60 * 60 * 1000; 
  const now = new Date();

  const populatedInvitations = await Promise.all(
    invitations.results.map(async (invitation) => {
      if (
        now - new Date(invitation.createdAt) > oneDayTime && 
        invitation.status === 'pending'
      ) {
        invitation.status = 'expired';  
        await invitation.save(); 
      }

      const populatedInvitation = await boardInvitations
        .findById(invitation._id)
        .populate({
          path: 'userId',
          select: 'name email role isActive image',
        });
      return populatedInvitation;
    })
  );

  return {
    ...invitations,
    results: populatedInvitations,
  };
};


const deleteInvitationById = async (invitationId) => {
  const boardInvitation = await boardInvitations.findById(invitationId);
  if (!boardInvitation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board Invitation not found');
  }
  await boardInvitation.remove();
  return boardInvitation;
};

module.exports = {
  createInvitation,
  getInvitationDataById,
  deleteInvitationById,
  queryBoardInvitations,
};
