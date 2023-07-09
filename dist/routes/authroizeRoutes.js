"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authroize_1 = require("../controller/authroize");
const router = express_1.default.Router();
router.post('/authroize', authroize_1.authorization);
exports.default = router;
