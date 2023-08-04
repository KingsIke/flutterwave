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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationCardUrl = exports.pinAuthorisenUrl = exports.cardInitiateUrl = exports.cardTokenized = exports.verification = exports.authorizationCard = exports.pinchargeCard = exports.cardInitiate = void 0;
const dotenv = __importStar(require("dotenv"));
const payload_1 = require("../middleware/payload");
const uuid_1 = require("uuid");
const encrypt_1 = require("../utils/encrypt");
const axios_1 = __importDefault(require("axios"));
const Flutterwave = require('flutterwave-node-v3');
const SKEY = process.env.SECRET_KEY;
const generateTxRef = () => {
    return (0, uuid_1.v4)();
};
dotenv.config();
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const cardInitiate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, payload_1.create_payload)(req);
    try {
        const response = yield flw.Charge.card(payload);
        const authorizationMode = response.meta.authorization.mode;
        if (authorizationMode === "pin") {
            res.status(200)
                .json({ message: "Input Pin" });
            // .redirect('/pay/validate')
        }
        else if (authorizationMode === 'redirect') {
            const txRef = response.data.tx_ref;
            const transactionId = response.data.id;
            const authUrl = response.meta.authorization.redirect;
            return res.redirect(authUrl);
        }
        else {
            const transactionId = response.data.id;
            const transaction = yield flw.Transaction.verify({ id: transactionId });
            if (transaction.data.status === 'successful') {
                return res.json({
                    message: 'payment successful'
                });
            }
            else {
                return res.json({
                    message: 'payment-failed'
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.cardInitiate = cardInitiate;
const pinchargeCard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, payload_1.create_payload)(req);
    const pin_payload = Object.assign(Object.assign({}, payload), { authorization: {
            mode: "pin",
            pin: req.body.pin,
        } });
    try {
        const checkCharge = yield flw.Charge.card(pin_payload);
        if (checkCharge.meta.authorization.mode === 'otp') {
            res.status(200).json(checkCharge.data);
        }
        else if (checkCharge.meta.authorization.mode === 'redirect') {
            const authUrl = checkCharge.meta.authorization.redirect;
            return res.redirect(authUrl);
        }
        else {
            const transactionId = checkCharge.data.id;
            const transaction = yield flw.Transaction.verify({
                id: transactionId
            });
            if (transaction.data.status == "success") {
                return res.json({ message: 'Payment successful' });
            }
            else {
                return res.json({ message: 'Payment-failed' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.pinchargeCard = pinchargeCard;
const authorizationCard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flw_ref = req.body.flw_ref;
        const otpValidatePayload = {
            otp: req.body.otp,
            flw_ref: flw_ref,
        };
        const otpValidation = yield flw.Charge.validate(otpValidatePayload);
        return res.status(200)
            .json(otpValidation);
        // .redirect('/token')
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.authorizationCard = authorizationCard;
const verification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.body.id;
        const response = yield flw.Transaction.verify({ id: transactionId });
        if (response.data.status === "successful") {
            res.json(response);
        }
        else {
            res.json({ message: "failed transaction" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.verification = verification;
const cardTokenized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = {
            token: req.body.token,
            currency: req.body.currency,
            country: req.body.country,
            amount: req.body.amount,
            email: req.body.email,
            tx_ref: generateTxRef(),
            narration: "Payment for monthly magazine subscription",
        };
        const charged = yield flw.Tokenized.charge(details);
        console.log(charged);
        res.json(charged);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.cardTokenized = cardTokenized;
const cardInitiateUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, payload_1.create_payload)(req);
        const encryptPayload = yield (0, encrypt_1.encrypt)(payload);
        const requestData = (yield axios_1.default.post('https://api.flutterwave.com/v3/charges?type=card', {
            'client': encryptPayload
        }, {
            headers: { "Authorization": `Bearer ${SKEY}`,
                "Content-Type": 'application/json' }
        })).data;
        console.log(requestData);
        return res.status(200).json({ message: "successful", data: requestData });
    }
    catch (error) {
        console.log(error.response.data);
        return res.json({ message: error.message });
    }
});
exports.cardInitiateUrl = cardInitiateUrl;
const pinAuthorisenUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, payload_1.create_payload)(req);
        const pin_payload = Object.assign(Object.assign({}, payload), { authorization: {
                mode: "pin",
                pin: req.body.pin,
            } });
        const encryptPayload = yield (0, encrypt_1.encrypt)(pin_payload);
        const requestData = (yield axios_1.default.post('https://api.flutterwave.com/v3/charges?type=card', {
            'client': encryptPayload
        }, {
            headers: { "Authorization": `Bearer ${SKEY}`,
                "Content-Type": 'application/json' }
        })).data;
        console.log(requestData);
        return res.status(200).json({ message: "successful", data: requestData });
    }
    catch (error) {
        console.log(error.response.data);
        return res.json({ message: error.message });
    }
});
exports.pinAuthorisenUrl = pinAuthorisenUrl;
const authorizationCardUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //   const flw_ref = req.body.flw_ref
        const otpValidatePayload = {
            otp: req.body.otp,
            flw_ref: req.body.flw_ref,
        };
        const encryptPayload = yield (0, encrypt_1.encrypt)(otpValidatePayload);
        const requestData = yield (yield axios_1.default.post('https://api.flutterwave.com/v3/validate-charge', encryptPayload, {
            headers: { "Authorization": `Bearer ${SKEY}`,
                "Content-Type": 'application/json' }
        })).data;
        console.log(requestData);
        return res.status(200).json({ message: "successful", data: requestData });
    }
    catch (error) {
        console.log(error);
        if ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) {
            return res.status(error.response.status || 500).json({
                message: error.response.data.message || 'An error occurred. Please try again later.'
            });
        }
        else {
            return res.status(500).json({ message: 'An error occurred. Please try again later.' });
        }
    }
    // THEY ARE DOING UPDATES ON THIS ROUTE 
});
exports.authorizationCardUrl = authorizationCardUrl;
