"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = require("../controller/verify");
const router = express_1.default.Router();
router.post('/verify-payment', verify_1.verification);
exports.default = router;
