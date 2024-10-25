"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../Controller/Controller"));
const router = (0, express_1.Router)();
router.get('/', Controller_1.default.index);
router.get('/:id', Controller_1.default.show);
router.post('/', Controller_1.default.store);
router.put('/:id', Controller_1.default.update);
router.delete('/:id', Controller_1.default.delete);
exports.default = router;
