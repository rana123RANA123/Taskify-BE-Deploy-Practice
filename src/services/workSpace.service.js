const { Workspace } = require('../models');
const WorkSpace = require('../models/workSpace.modal');
const createWorkSpace = async (workspaceData) => {
  const workspace = await WorkSpace.create(workspaceData);
  return workspace;
};

const getWorkSpaceById = async (id) => {
  const workspace = await WorkSpace.findById(id);
  if (!workspace) {
    throw new Error('Workspace not found');
  }
  return workspace;
};

const getAllWorkSpaces = async (req, res) => {
  try {
    const userId = req.userId;
    
    const workspaces = await WorkSpace.find({ userId });
    res.status(201).json(workspaces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const queryWorkspace = async (filter, options) => {
  const workspaces = await WorkSpace.paginate(filter, options);
  return workspaces;
};

const updateWorkspaceById = async (workspaceId, updateBody, userId) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  if (workspace.userId.toString() !== userId) {
    return 'You do not have permission to delete this board';
  }
  Object.assign(workspace, updateBody);
  await workspace.save();
  return workspace;
};

const deleteWorkspaceById = async (workspaceId) => {
  const workspace = await WorkSpace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }

  await workspace.remove();
  return workspace;
};

module.exports = {
  createWorkSpace,
  getWorkSpaceById,
  getAllWorkSpaces,
  deleteWorkspaceById,
  updateWorkspaceById,
  queryWorkspace,
};
