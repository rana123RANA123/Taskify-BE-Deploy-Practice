const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { boardInvitationService } = require('../services');

const createBoardInvitation = catchAsync(async (req, res) => {
  try {
    const userId = req.userId;
    const { boardId } = req.body;
    const invitation = await boardInvitationService.createInvitation(
        boardId,
        userId,
    );
    res.status(httpStatus.CREATED).send({ invitation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getBoardInvitations = catchAsync(async (req, res) => {
  const { sortBy, limit, page, boardId } = req.query;
  const options = { sortBy, limit, page };

  if (page < 1 || limit < 1) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Page and limit must be positive integers.' });
  }

  try {
    const query = { boardId };

    const invitations = await boardInvitationService.queryBoardInvitations(
      query,
      options
    );

    res.status(httpStatus.OK).send(invitations);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
});

const deleteBoardInvitation = catchAsync(async (req, res) => {
  const { invitationId } = req.params;
  const boardInvitation = await boardInvitationService.getInvitationDataById(
    invitationId
  );
  if (!boardInvitation) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Board Invitation not found',
    });
  }

  await boardInvitationService.deleteInvitationById(invitationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBoardInvitation,
  deleteBoardInvitation,
  getBoardInvitations,
};
