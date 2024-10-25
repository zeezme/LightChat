"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("../../Users/Routes/Routes"));
const express_1 = require("express");
const defaultRoutes = (0, express_1.Router)();
exports.default = defaultRoutes;
defaultRoutes.use('/users', Routes_1.default);
