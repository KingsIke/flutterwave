"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../controller/validate");
const router = express_1.default.Router();
router.post('/pay/validate', validate_1.validate_pay);
exports.default = router;
