const express = require("express");
const sampleModuleRouter = express.Router();
const SampleModuleController = require('../controllers/sample-module-controller');

sampleModuleRouter.post('/new-path', handledMiddleware(SampleModuleController.samplePath));

module.exports = sampleModuleRouter;