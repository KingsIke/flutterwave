"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_payload = void 0;
const uuid_1 = require("uuid");
const Joi = __importStar(require("joi"));
const generateTxRef = () => {
    return (0, uuid_1.v4)();
};
const payloadSchema = Joi.object({
    card_number: Joi.string().required(),
    cvv: Joi.string().required(),
    expiry_month: Joi.string().required(),
    expiry_year: Joi.string().required(),
    currency: Joi.string().required(),
    amount: Joi.number().required(),
    email: Joi.string().required().email(),
    fullname: Joi.string().required(),
    pin: Joi.string()
});
const create_payload = (req) => {
    const { error, value } = payloadSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return {
        card_number: req.body.card_number,
        cvv: req.body.cvv,
        expiry_month: req.body.expiry_month,
        expiry_year: req.body.expiry_year,
        currency: req.body.currency,
        amount: req.body.amount,
        email: req.body.email,
        fullname: req.body.card_fullname,
        tx_ref: generateTxRef(),
        redirect_url: 'https://getflick.app/',
        enckey: process.env.ENCRYPTION_KEY
    };
};
exports.create_payload = create_payload;
