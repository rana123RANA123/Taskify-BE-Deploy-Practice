const checklistService = require('../services/checkLists.service');

const createChecklist = async (req, res) => {
  try {
    const checklist = await checklistService.createChecklist(req.body);
    res.status(201).send(checklist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllChecklists = async (req, res) => {
  try {
    const checklists = await checklistService.getAllChecklists();
    res.status(200).send(checklists);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getChecklistById = async (req, res) => {
  try {
    const checklist = await checklistService.getChecklistById(req.params.id);
    res.status(200).send(checklist);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const updateChecklist = async (req, res) => {
  try {
    const checklist = await checklistService.updateChecklist(
      req.params.id,
      req.body
    );
    res.status(200).send(checklist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteChecklist = async (req, res) => {
  try {
    await checklistService.deleteChecklist(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  createChecklist,
  getAllChecklists,
  getChecklistById,
  updateChecklist,
  deleteChecklist,
};
