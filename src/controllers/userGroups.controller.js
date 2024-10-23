const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { usergroupService } = require('../services');
const pick = require('../utils/pick');
const Usergroup = require('../models/usergroup.model');

const createUserGroup = catchAsync(async (req, res) => {
  const userGroup = await usergroupService.createUserGroup(req.body);

  res.status(httpStatus.CREATED).send({ userGroup });
});

const getUserGroupById = async (id) => Usergroup.findById(id);

const getUserGroup = catchAsync(async (req, res) => {
  const UserGroup = await getUserGroupById(req.params.userGroupId);
  const agencyIdString = UserGroup.agencyId.toString();
  if (agencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to GET this UserGroup Data.' });
  }
  res.send(UserGroup);
});

const updateUserGroup = catchAsync(async (req, res) => {
  const UserGroup = await getUserGroupById(req.params.userGroupId);
  const agencyIdString = UserGroup.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to update this UserGroup Data.' });
  }

  const updatedUserGroup = await usergroupService.updateUserGroupById(req.params.userGroupId, req.body);
  res.send(updatedUserGroup);
});

const deleteUserGroup = catchAsync(async (req, res) => {
  const UserGroup = await getUserGroupById(req.params.userGroupId);
  const agencyIdString = UserGroup.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to delete this UserGroup Data.' });
  }

  await usergroupService.deleteUserGroupById(req.params.userGroupId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserGroups = catchAsync(async (req, res) => {
  const agencyId = req.body.agencyId;
  const filter = { agencyId };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await usergroupService.queryUserGroup(filter, options);
  res.send(result);
});

module.exports = {
  createUserGroup,
  deleteUserGroup,
  updateUserGroup,
  getUserGroups,
  getUserGroup,
};
