const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { templateService } = require('../services');

const createTemplate = catchAsync(async (req, res) => {
    const template = await templateService.createTemplate(req.body);
    res.status(httpStatus.CREATED).send(template);
});

const getAllTemplates = catchAsync(async (req, res) => {
    const templates = await templateService.getAllTemplates();
    res.status(httpStatus.OK).send(templates);
});

const getTemplateById = catchAsync(async (req, res) => {
    const template = await templateService.getTemplateById(req.params.templateId);
    if (!template) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Template not found' });
    } else {
        res.status(httpStatus.OK).send(template);
    }
});

const updateTemplate = catchAsync(async (req, res) => {
    const template = await templateService.updateTemplate(req.params.templateId, req.body);
    if (!template) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Template not found' });
    } else {
        res.status(httpStatus.OK).send(template);
    }
});

const deleteTemplate = catchAsync(async (req, res) => {
    const template = await templateService.deleteTemplate(req.params.templateId);
    if (!template) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Template not found' });
    } else {
        res.status(httpStatus.NO_CONTENT).send();
    }
});

module.exports = {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
};
