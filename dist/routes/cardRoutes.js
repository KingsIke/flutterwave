"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_1 = require("../controller/card");
const router = express_1.default.Router();
router.post('/pay', card_1.cardInitiate);
router.post('/pay-pin', card_1.pinchargeCard);
router.post('/authroize', card_1.authorizationCard);
router.post('/verify-payment', card_1.verification);
router.post('/token', card_1.cardTokenized);
router.post('/url_pay', card_1.cardInitiateUrl);
router.post('/url_pinAuth', card_1.pinAuthorisenUrl);
router.post('/url_authroize', card_1.authorizationCardUrl);
exports.default = router;
