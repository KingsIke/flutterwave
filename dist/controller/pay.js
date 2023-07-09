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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pay_authroize = void 0;
const dotenv = __importStar(require("dotenv"));
const schema_1 = require("../model/schema");
const payload_1 = require("../middleware/payload");
const pin_1 = require("../model/pin");
const Flutterwave = require('flutterwave-node-v3');
dotenv.config();
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const pay_authroize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, payload_1.create_payload)(req);
    try {
        const existingUserDetails = yield pin_1.UserDetails.findOne({
            where: {
                'payload.email': payload.email,
                'payload.card_number': payload.card_number,
                'payload.cvv': payload.cvv,
            },
        });
        if (existingUserDetails) {
            return res.status(200)
                .json({ message: 'User details already exist' });
            // .redirect('/pay/validate')
        }
        const response = yield flw.Charge.card(payload);
        yield pin_1.UserDetails.create({ payload });
        const authorizationMode = response.meta.authorization.mode;
        if (authorizationMode === "pin") {
            res.status(200)
                .json({ message: "Input Pin" });
            // .redirect('/pay/validate')
        }
        else if (authorizationMode === 'redirect') {
            yield schema_1.Transaction.create({
                txRef: response.data.tx_ref,
                transactionId: response.data.id,
            });
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
exports.pay_authroize = pay_authroize;
