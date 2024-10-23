const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Usergroup = require('../models/usergroup.model');

const createUserGroup = async (userBody) => {
  return Usergroup.create(userBody);
};

const getUserGroupById = async (id) => Usergroup.findById(id);

const queryUserGroup = async (filter, options) => Usergroup.paginate(filter, options);

const updateUserGroupById = async (userGroupId, updateBody) => {
  const userGroup = await getUserGroupById(userGroupId);

  if (!userGroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserGroup not found');
  }

  Object.assign(userGroup, updateBody);
  await userGroup.save();

  return userGroup;
};

const deleteUserGroupById = async (userGroupId) => {
  const userGroup = await getUserGroupById(userGroupId);
  if (!userGroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserGroup not found');
  }
  await userGroup.remove();
  return userGroup;
};

module.exports = {
  queryUserGroup,
  createUserGroup,
  updateUserGroupById,
  deleteUserGroupById,
};
