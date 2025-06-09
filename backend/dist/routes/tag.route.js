"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagRouter = void 0;
const express_1 = require("express");
const tags_controller_1 = require("../controllers/tags.controller");
const tagRouter = (0, express_1.Router)();
exports.tagRouter = tagRouter;
tagRouter.get('/', tags_controller_1.tagsController.getAllTags);
