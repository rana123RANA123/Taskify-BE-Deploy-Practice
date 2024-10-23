const httpStatus = require('http-status');
const Boards = require('../models/boards.modal');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const {
  shareBoardMails,
} = require('./email.service');

const createBoard = async (boardBody) => {
  const board = await Boards.create(boardBody);
  return board;
};

const getBoardById = async (id) => {
  return Boards.findById(id)
    .populate({
      path: 'users.user',
      select: 'name email role isActive image',
    })
};

const getBoardDataById = async (boardId) => {
  const board = await Boards.findById(boardId);
  return board;
};

const updateBoardById = async (boardId, updateBody, userId) => {
  const board = await Boards.findById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }

  if (board.userId.toString() !== userId) {
    return 'You do not have permission to delete this board';
  }

  Object.assign(board, updateBody);
  await board.save();
  return board;
};

const queryBoards = async (filter, options) => {
  const boards = await Boards.paginate(filter, options);
  return boards;
};

const deleteBoardById = async (boardId) => {
  const board = await Boards.findById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }
  await board.remove();
  return board;
};

const searchBoards = async (query, userId) => {
  return Boards.find({
    name: { $regex: query, $options: 'i' },
    userId: userId,
  });
};

const addUsersInBoard = async (boardId, users, note, userId) => {
  const board = await Boards.findById(boardId);
  const userData = await User.findById(userId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }

  const toEmails = [];

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  for (const { userId, role } of users) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, `User not found: ${userId}`);
    }

    toEmails.push(user.email);

    const existingUser = board.users.find((u) => u.user.equals(user._id));

    const subject = 'Trello';
    const boardName = board.name;
    const boardLink = `${process.env.LINK_URL}/${board?.id}/board`;
    const fromEmail = userData.email;
    const hostName = userData.name;

    if (existingUser) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'This user already added in this board'
      );
    } else {
      if (!note && !boardLink && !boardName) {
        board.users.push({
          user: user._id,
          role,
        });
      } else {
        board.users.push({
          user: user._id,
          role,
        });

        shareBoardMails({
          toEmails,
          fromEmail,
          subject,
          boardName,
          boardLink,
          note,
          hostName,
        });
      }
    }
  }

  await board.save();
  return board;
};

const updateUserRole = async (boardId, userId, newRole) => {
  const board = await Boards.findById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }
  
  const userToUpdate = board.users.find((user) => user.user.equals(userId));

  if (!userToUpdate) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `User not associated with this board: ${userId}`
    );
  }

  userToUpdate.role = newRole;

  await board.save();

  return board;
};

const removeUser = async (boardId, userId) => {
  const board = await Boards.findById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }

  board.users = board.users.filter((user) => !user.user.equals(userId));

  await board.save();
  return board;
};

module.exports = {
  createBoard,
  getBoardById,
  updateBoardById,
  queryBoards,
  deleteBoardById,
  searchBoards,
  addUsersInBoard,
  removeUser,
  updateUserRole,
  getBoardDataById,
};
