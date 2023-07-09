"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pay_1 = require("../controller/pay");
const router = express_1.default.Router();
router.post('/pay', pay_1.pay_authroize);
exports.default = router;
