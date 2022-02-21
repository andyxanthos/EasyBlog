"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dirConfig = {
    // DIRECTORY CONFIG
    viewsDir: path_1.default.join(__dirname, '../views'),
    postsDir: path_1.default.join(__dirname, '../posts'),
    metaDir: path_1.default.join(__dirname, '../meta'),
    staticFiles: ['index.hbs', 'layout.hbs']
};
exports.default = dirConfig;
