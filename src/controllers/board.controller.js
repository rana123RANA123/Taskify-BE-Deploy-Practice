const httpStatus = require('http-status');
const boardService = require('../services/boards.service');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const createBoard = catchAsync(async (req, res) => {
  try {
    const userId = req.userId;

    const boardData = {
      ...req.body,
      userId,
    };
    const board = await boardService.createBoard(boardData);
    res.status(httpStatus.CREATED).send({ board });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getBoardById = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const board = await boardService.getBoardDataById(boardId);
  if (!board) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Board not found ',
    });
  }
  res.status(httpStatus.OK).send(board);
});


const getBoard = catchAsync(async (req, res) => {
  const { boardId, userId } = req.params;
  const board = await boardService.getBoardById(boardId);
  if (!board) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Board not found ',
    });
  }
  if (!userId) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'userId not provided',
    });
  }

  const existingUser = board.users.find((u) => u.user.equals(userId));

  const userRole = existingUser.role

  if (!existingUser) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'User not added in this board',
    });
  }
  const activeBoard = {
    ...board._doc,   
    userRole,      
  };

  const updatedBoard = JSON.parse(
    JSON.stringify(activeBoard).replace(/"_id":/g, '"id":')
  );
  
  res.status(httpStatus.OK).send(updatedBoard);
});


const getBoards = catchAsync(async (req, res) => {
  const { sortBy, limit, page, favourite, workspaceId, searchQuery } =
    req.query;
  const options = { sortBy, limit, page };

  const userId = req.userId;

  if (page < 1 || limit < 1) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Page and limit must be positive integers.' });
  }

  try {
    const query = { userId };
    if (favourite) {
      query.favourite = favourite === 'true';
    }

    if (workspaceId) {
      query.workspaceId = workspaceId;
    }

    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: 'i' };
    }

    const boards = await boardService.queryBoards(query, options);

    res.status(httpStatus.OK).send(boards);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
});

const updateBoard = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const userId = req.userId;

  const board = await boardService.updateBoardById(boardId, req.body, userId);
  if (!board) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Board not found',
    });
  }
  res.status(httpStatus.OK).send(board);
});

const deleteBoard = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const userId = req.userId;
  const board = await boardService.getBoardById(boardId);
  if (!board) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Board not found',
    });
  }
  if (board.userId.toString() !== userId) {
    return res.status(httpStatus.FORBIDDEN).send({
      message: 'You do not have permission to delete this board',
    });
  }

  await boardService.deleteBoardById(boardId);
  res.status(httpStatus.NO_CONTENT).send();
});


const addUsersInBoard = catchAsync(async (req, res) => {
  const { boardId  } = req.params; 
  const { users, note} = req.body;
  const userId = req.userId;
  const board = await boardService.addUsersInBoard(boardId,  users, note, userId);
  res.status(httpStatus.OK).send(board);
});


const updateUserinBoard = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const { newRole , userId} = req.body;
  const updatedBoard = await boardService.updateUserRole(
    boardId,
    userId,
    newRole
  );
  res.status(httpStatus.OK).json(updatedBoard);
});

const removeUserFromBoard = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const { userId } = req.body; 

  const board = await boardService.removeUser(boardId, userId);
  res.status(httpStatus.OK).send(board);
});

module.exports = {
  createBoard,
  updateBoard,
  getBoards,
  getBoardById,
  getBoard,
  deleteBoard,
  addUsersInBoard,
  removeUserFromBoard,
  updateUserinBoard,
};
