const { Checklist } = require('../models/checklist.modal');

const createChecklist = async (checklistData) => {
  const checklist = new Checklist(checklistData);
  await checklist.save();
  return checklist;
};

const getAllChecklists = async (ticketId) => {
  if (!ticketId) {
    throw new Error('Ticket ID is required to fetch checklists');
  }
  const checklists = await Checklist.find({ ticketId });
  return checklists;
};

const getChecklistById = async (id) => {
  return Checklist.findById(id);
};

const updateChecklist = async (id, updateData) => {
  return Checklist.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteChecklist = async (id) => {
  return Checklist.findByIdAndDelete(id);
};

module.exports = {
  createChecklist,
  getAllChecklists,
  getChecklistById,
  updateChecklist,
  deleteChecklist,
};
