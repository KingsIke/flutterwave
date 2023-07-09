"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenized_1 = require("../controller/tokenized");
const router = express_1.default.Router();
router.post('/token', tokenized_1.cardTokenized);
exports.default = router;
